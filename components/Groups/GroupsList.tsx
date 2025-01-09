"use client";
import { Group, searchGroups } from "@/lib/mangadex/groups";
import {
  Button,
  Divider,
  Input,
  Link,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GroupsListProps {
  page: number;
  limit: number;
  q: string;
}

export default function GroupsList({ page, limit, q }: GroupsListProps) {
  const offset = (page - 1) * limit;
  const [value, setValue] = useState(q);
  const [loading, setLoading] = useState(false);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [groups, setGroups] = useState<Group[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const searchParams = new URLSearchParams();
  if (value !== "") searchParams.set("q", value);
  searchParams.set("page", page.toString());
  let searchUrl = `/groups?${searchParams.toString()}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const gr = await searchGroups(limit, offset, value);
        setGroups(gr.groups);
        setTotal(gr.total);
      } catch (error) {
        setFetchFailed(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchUrl]);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex flex-col px-1 mt-3">
          <Divider className="w-9 h-1 bg-danger" />
          <h1 className="text-2xl font-extrabold uppercase">Nhóm dịch</h1>
        </div>
        <Input
          radius="sm"
          startContent={<Search size={20} />}
          variant="faded"
          placeholder="Nhập tên nhóm..."
          value={value}
          onValueChange={(val) => {
            setValue(val);
            router.push(`/groups?q=${val}`);
          }}
          isClearable
        />
        <Spinner color="danger" size="lg" />
      </div>
    );
  }

  if (fetchFailed) return null;

  return (
    <div className="flex flex-col gap-4 justify-between">
      <div className="flex flex-col px-1 mt-3">
        <Divider className="w-9 h-1 bg-danger" />
        <h1 className="text-2xl font-extrabold uppercase">Nhóm dịch</h1>
      </div>

      <Input
        radius="sm"
        startContent={<Search size={20} />}
        variant="faded"
        placeholder="Nhập tên nhóm..."
        value={value}
        onValueChange={(val) => {
          setValue(val);
          router.push(`/groups?q=${val}`);
        }}
        isClearable
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-1">
        {groups.map((group) => (
          // <NoPrefetchLink href={`/groups/${group.id}`} key={group.id}>
          //   <Card
          //     radius="none"
          //     shadow="sm"
          //     isHoverable
          //     className="rounded-md"
          //     // isPressable
          //     fullWidth
          //   >
          //     <CardBody className="flex flex-row gap-2 p-2 items-center">
          // <img
          //   src="/hanabi_holder.webp"
          //   alt="Gr Avt"
          //   className="rounded-full w-9 h-9 border-2 border-danger"
          // />
          // <p className="text-lg line-clamp-1 font-semibold">
          //   {group.name}
          // </p>
          //     </CardBody>
          //   </Card>
          // </NoPrefetchLink>
          <Button
            fullWidth
            as={Link}
            href={`/groups/${group.id}`}
            radius="sm"
            key={group.id}
            size="lg"
            startContent={
              <img
                src="/hanabi_holder.webp"
                alt="Gr Avt"
                className="rounded-full w-9 h-9 border-2 border-danger"
              />
            }
            className="justify-start px-2 line-clamp-1"
            variant="flat"
          >
            <p className="text-lg line-clamp-1 font-semibold">{group.name}</p>
          </Button>
        ))}
      </div>
      {total !== 0 && (
        <Pagination
          showControls
          showShadow
          color="danger"
          initialPage={page}
          radius="sm"
          total={Math.ceil(total / limit)}
          onChange={(p) => {
            router.push(searchUrl.replace(/page=\d+/, `page=${p}`));
          }}
          className="self-center"
          // isCompact
        />
      )}
    </div>
  );
}
