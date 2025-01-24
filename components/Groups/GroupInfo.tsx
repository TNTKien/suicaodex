"use client";

import { getGroupById, Group } from "@/lib/mangadex/groups";
import { cn } from "@/lib/utils";
import { Button, Card, CardBody, Tab, Tabs } from "@heroui/react";
import { Globe, Mail, MessageSquare, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { SiDiscord, SiX } from "@icons-pack/react-simple-icons";
import GroupFeeds from "./GroupFeeds";
import { useRouter } from "next/navigation";

interface GroupInfoProps {
  groupID: string;
  page: number;
  tab: string;
}

const GroupInfo = ({ groupID, page, tab }: GroupInfoProps) => {
  const [group, setGroup] = useState<Group | null>(null);
  const [fetchFailed, setFetchFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(tab);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getGroupById(groupID);
        setGroup(data);
      } catch (error) {
        console.log(error);
        setFetchFailed(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupID]);

  if (fetchFailed) {
    return null;
  }

  return (
    (<div className="md:px-8">
      <div className="absolute h-[12rem] z-0 w-auto left-0 right-0 top-[4rem] block">
        <div
          className={cn(
            "absolute h-[12rem] w-full",
            "transition-[width] duration-150 ease-in-out",
            "bg-no-repeat bg-cover bg-center-50"
          )}
          style={{ backgroundImage: `url('/gr_cover.webp')` }}
        ></div>
        <div
          className={cn(
            "absolute h-[12rem] w-auto inset-0 pointer-events-none",
            "backdrop-blur-none md:backdrop-blur-sm",
            "bg-gradient-to-r from-black/65 to-transparent"
          )}
        ></div>
        <div
          className={cn(
            "md:hidden",
            "absolute h-[12rem] w-auto right-0 left-0 pointer-events-none backdrop-blur-[2px]"
          )}
          style={{
            background:
              "linear-gradient(to bottom, hsl(var(--background) / .6) 0%, hsl(var(--background)) 100%)",
          }}
        ></div>
      </div>
      <div className="flex flex-col gap-4 mt-[6rem] z-10 ">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            alt={`Group Avt`}
            className="object-cover z-0 w-40 h-40 rounded-full border-4 border-danger"
            src="/gr_avt.webp"
          />

          <div className="flex flex-col gap-1 z-10 top-1 justify-start sm:justify-end">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-lg">
              {group?.name}
            </h1>
            <div className="flex flex-row items-center gap-4">
              <span className="flex flex-row items-center gap-1">
                <Upload size={18} /> {group?.totalUploaded}
              </span>
              <span className="flex flex-row items-center gap-1">
                <MessageSquare size={18} /> {group?.repliesCount}
              </span>
            </div>
          </div>
        </div>

        <Tabs
          selectedKey={selected}
          onSelectionChange={(key) => {
            setSelected(key.toString());
            router.push(`/groups/${groupID}?tab=${key}`);
          }}
          aria-label="Options"
          classNames={{
            tabList: "rounded-md",
            // tab: "px-3 py-2",
            cursor: "rounded-md",
            panel: "w-full p-0",
            tabContent: "font-semibold",
          }}
        >
          <Tab
            key="info"
            title="Thông tin chung"
            className="flex flex-col gap-4"
          >
            {!!group?.leader && (
              <div className="flex flex-col gap-1 justify-start">
                <p className="font-bold">Trưởng nhóm</p>
                <Card shadow="sm" className="rounded-md">
                  <CardBody className="p-2 flex flex-row gap-2 items-center">
                    <img
                      src="/hanabi_holder.webp"
                      alt="Leader Avt"
                      className="rounded-full w-10 h-10 border-2 border-danger"
                    />
                    <p className="text-lg line-clamp-1 font-semibold">
                      {group?.leader.username}
                    </p>
                  </CardBody>
                </Card>
              </div>
            )}

            {(!!group?.website ||
              !!group?.discord ||
              !!group?.email ||
              !!group?.twitter) && (
              <div className="flex flex-col gap-1 justify-start">
                <p className="font-bold">Liên hệ</p>
                <div className=" flex flex-row gap-2 items-center">
                  {!!group?.website && (
                    <Button
                      size="md"
                      radius="sm"
                      startContent={<Globe />}
                      as={Link}
                      href={group?.website}
                      target="_blank"
                    >
                      Website
                    </Button>
                  )}
                  {!!group?.discord && (
                    <Button
                      size="md"
                      radius="sm"
                      startContent={<SiDiscord />}
                      as={Link}
                      href={`https://discord.gg/${group?.discord}`}
                      target="_blank"
                    >
                      Discord
                    </Button>
                  )}
                  {!!group?.email && (
                    <Button
                      size="md"
                      radius="sm"
                      startContent={<Mail />}
                      as={Link}
                      href={`mailto:${group?.email}`}
                      target="_blank"
                    >
                      Email
                    </Button>
                  )}

                  {!!group?.twitter && (
                    <Button
                      size="md"
                      radius="sm"
                      startContent={<SiX />}
                      as={Link}
                      href={group?.twitter}
                      target="_blank"
                    >
                      @{group?.twitter.replace("https://twitter.com/", "")}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {!!group?.description && (
              <div className="flex flex-col gap-1 justify-start">
                <p className="font-bold">Mô tả</p>

                <ReactMarkdown
                  components={{
                    a: ({ href, children }) => (
                      <a href={href} style={{ textDecoration: "underline" }}>
                        {children}
                      </a>
                    ),
                  }}
                  remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                >
                  {group?.description.replace(/   /g, "")}
                </ReactMarkdown>
              </div>
            )}
          </Tab>
          <Tab key="feed" title="Truyện đã đăng">
            <GroupFeeds id={groupID} page={page} />
          </Tab>
        </Tabs>
      </div>
    </div>)
  );
};

export default GroupInfo;
