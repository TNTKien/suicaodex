"use client";

import {
  Alert,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tab,
  Tabs,
} from "@heroui/react";
import { FC, useEffect, useState } from "react";
import {
  Archive,
  BookOpenCheck,
  BookOpenText,
  LibraryBig,
  List,
  MessageSquare,
} from "lucide-react";
import { MangaRating } from "./MangaRating";
import MangaTags from "./MangaTags/TagsChip";
import MangaDesc from "./MangaDesc";
import MangaDetailSkeleton from "./MangaDetailSkeleton";
import { LibModal } from "./AddToLib/LibModal";
import { NotFound } from "@/components/notFound";
import { ChapterVolumeNew } from "@/components/Chapter/ChapterTable/ChapterVolumeNew";
import { Chapter, Manga, MangaStats } from "@/types";
import {
  getChapters,
  getFirstChapter,
  getMangaDetails,
  getMangaRating,
} from "@/lib/data";
import { siteConfig } from "@/config/site";
import { ContinueReading } from "./ContinueReading";
// import NoComment from "@/components/Comment/NoComment";
// import CommentSection from "@/components/Comment/CommentSection";
// import CommentCard from "@/components/Comment/CommentCard";
// import RandomCmts, { commentData } from "@/lib/mock-cmt";
// import CommentAlert from "@/components/Comment/CommentAlert";
import Link from "next/link";
import { GiscusCmt } from "@/components/Comment/GiscusCmt";
import { getTotalCmts } from "@/lib/giscus";

interface MangaDetailsProps {
  mangaID: string;
  session?: any;
}

const MangaDetailsNew: FC<MangaDetailsProps> = ({ mangaID, session }) => {
  const [info, setInfo] = useState<Manga | null>(null);
  const [lists, setLists] = useState<Chapter[]>([]);
  const [rating, setRating] = useState<MangaStats | null>(null);
  const [firstChapter, setFirstChapter] = useState<Chapter | null>(null);
  const [totalCmts, setTotalCmts] = useState<number>(0);
  const [fetchFailed, setFetchFailed] = useState(false);
  const coverURL = siteConfig.suicaodex.apiURL + "/covers";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mangaDetails = await getMangaDetails(mangaID);
        setInfo(mangaDetails);

        const tite = mangaDetails.title + " - " + "SuicaoDex";
        const cmts = await getTotalCmts("TNTKien/suicaodex", tite);
        setTotalCmts(cmts);

        const chapters = await getChapters(mangaID, "vi", 1);
        setLists(chapters);

        const stats = await getMangaRating(mangaID);
        setRating(stats);

        const first = await getFirstChapter(mangaID, "vi");
        setFirstChapter(first);
      } catch (error) {
        console.log(error);
        setFetchFailed(true);
      }
    };

    fetchData();
  }, []);

  if (fetchFailed) {
    return <NotFound />;
  }

  if (!info) {
    return <MangaDetailSkeleton />;
  }

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-8">
      <Modal
        hideCloseButton
        backdrop="blur"
        defaultOpen={info.contentRating === "pornographic"}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row gap-1">
                CẢNH BÁO
              </ModalHeader>
              <ModalBody>
                <p>
                  Truyện có yếu tố{" "}
                  <span className="text-danger font-semibold">18+</span>, bạn có
                  chắc chắn muốn xem?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button as={Link} href="/" variant="faded" radius="sm">
                  Không
                </Button>
                <Button color="danger" onPress={onClose} radius="sm">
                  Chắc chắn
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className="w-full flex flex-col gap-2">
        <Card className="flex flex-col rounded-t-none " radius="sm" shadow="sm">
          <Image
            alt={`Ảnh bìa ${info.title}`}
            className="absolute w-full object-cover z-0 max-h-[230px] blur-sm brightness-50 "
            radius="none"
            src={`${coverURL}/${mangaID}/${info.cover}.512.jpg`}
            width="100%"
            loading="eager"
            height={230}
            fallbackSrc="/doro_think.webp"
            //isBlurred
            // width={134}
          />
          <CardHeader>
            <div className="items-start flex flex-col sm:flex-row gap-4">
              <Image
                //removeWrapper
                //loading="eager"
                // as={NextImage}
                // priority
                alt={`Ảnh bìa ${info.title}`}
                className="object-cover z-0 max-w-[200px] h-auto"
                classNames={{
                  wrapper: "bg-norepeat bg-cover bg-center",
                }}
                radius="sm"
                shadow="sm"
                src={`${coverURL}/${mangaID}/${info.cover}.512.jpg`}
                height={300}
                width={200}
                fallbackSrc="/doro_think.webp"
              />

              <div className="flex flex-col items-start gap-2 z-10 top-1 sm:text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                  {info.title}
                </h1>
                {info.altTitle === info.title ? null : (
                  <p className="text-xl font-medium text-muted-foreground drop-shadow-lg">
                    {info.altTitle}
                  </p>
                )}
                <p className="text-sm text-muted-foreground drop-shadow-lg">
                  {info.author === info.artist
                    ? info.author
                    : `${info.author}, ${info.artist}`}
                </p>
                <div className="flex flex-wrap gap-1">
                  <MangaTags
                    contentRating={info.contentRating}
                    status={info.status}
                    tags={info.tags}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardFooter className="bottom-0 flex flex-col bg-inherit items-start gap-2 z-10">
            {info.description && <MangaDesc desc={info.description} />}
          </CardFooter>
        </Card>
        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/2 max-h-fit rounded-lg shadow-small bg-content1">
            <div className="flex flex-col gap-2 p-3">
              <ContinueReading mangaId={mangaID} />
              <LibModal
                latestChapter={lists[0]}
                manga={info}
                session={session}
              />

              {lists[0]?.id && (
                <ButtonGroup
                  fullWidth
                  color="danger"
                  radius="sm"
                  size="md"
                  variant="faded"
                >
                  <Button
                    as={Link}
                    className="font-semibold"
                    href={
                      lists[0]?.externalUrl
                        ? lists[0]?.externalUrl
                        : `/chapter/${lists[0]?.id}`
                    }
                    //isExternal={lists[0]?.externalUrl ? true : false}
                    target={lists[0]?.externalUrl ? "_blank" : "_self"}
                    startContent={<BookOpenCheck />}
                  >
                    Đọc mới nhất
                  </Button>
                  <Button
                    as={Link}
                    className="font-semibold"
                    href={
                      firstChapter?.externalUrl
                        ? firstChapter?.externalUrl
                        : `/chapter/${firstChapter?.id}`
                    }
                    //isExternal={firstChapter?.externalUrl ? true : false}
                    target={firstChapter?.externalUrl ? "_blank" : "_self"}
                    startContent={<BookOpenText />}
                  >
                    Đọc từ đầu
                  </Button>
                </ButtonGroup>
              )}
              <ButtonGroup
                fullWidth
                color="danger"
                radius="sm"
                size="md"
                variant="faded"
              >
                <Button
                  as={Link}
                  className="font-semibold"
                  startContent={<Archive />}
                  href={`${siteConfig.mangadexAPI.webURL}/title/${mangaID}`}
                  target="_blank"
                  //isExternal={true}
                >
                  MangaDex
                </Button>
                {info.raw && (
                  <Button
                    as={Link}
                    className="font-semibold"
                    href={info.raw}
                    startContent={<LibraryBig />}
                    target="_blank"
                    //isExternal={true}
                  >
                    Raw
                  </Button>
                )}
              </ButtonGroup>

              {rating && <MangaRating stats={rating} />}
            </div>
          </div>

          {/* DS chương & Cmt */}
          <div className="flex w-full flex-col">
            <Tabs
              aria-label="Options"
              radius="sm"
              fullWidth
              classNames={{
                tabList: "rounded-lg",
                //tab: "px-1.5 py-2",
                cursor: "rounded-lg",
                panel: "px-0 rounded-md py-2",
              }}
            >
              <Tab
                key="chapters"
                title={
                  <div className="flex flex-row gap-1 font-semibold items-center">
                    <List />
                    <span>Danh sách chương</span>
                  </div>
                }
              >
                <ChapterVolumeNew
                  finalChapter={info.finalChapter}
                  language="vi"
                  limit={100}
                  mangaID={mangaID}
                />
              </Tab>
              <Tab
                key="comments"
                title={
                  <div className="flex flex-row gap-1 font-semibold items-center">
                    <MessageSquare />
                    <span>Bình luận</span>
                    {!!totalCmts && totalCmts !== 0 && (
                      <span>({totalCmts})</span>
                    )}
                  </div>
                }
              >
                <div className="flex flex-col gap-2">
                  <Alert
                    color="primary"
                    title="Bạn chỉ cần đăng nhập bằng Github tại đây để bình luận!"
                    description="Đăng nhập SuicaoDex bằng các loại tài khoản khác không ảnh hưởng gì cả!!"
                    variant="faded"
                    radius="sm"
                    classNames={{
                      base: "p-2 items-center",
                      title: "font-semibold",
                      mainWrapper: "ms-0.5",
                    }}
                  />
                  <Card shadow="sm" radius="sm" fullWidth>
                    <CardBody className="p-2">
                      <GiscusCmt
                        repo="TNTKien/suicaodex"
                        repoID="R_kgDOM8XBHw"
                        category="Manga"
                        categoryID="DIC_kwDOM8XBH84ClOmP"
                        reactionsEnabled="0"
                        strictMode="0"
                        position="top"
                      />
                    </CardBody>
                  </Card>
                </div>

                {/* <CommentAlert />

                <CommentSection />

                {mockComts.map((cmt, index) => (
                  <CommentCard
                    key={index}
                    user={{
                      avatar: cmt.user.avatar,
                      name: cmt.user.name,
                    }}
                    content={cmt.content}
                    downvotes={cmt.downvotes}
                    upvotes={cmt.upvotes}
                    updatedAt={cmt.updatedAt}
                  />
                ))} */}

                {/* <NoComment /> */}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaDetailsNew;
