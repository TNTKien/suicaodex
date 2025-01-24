"use client";

import {
  getChapters,
  getFirstChapter,
  getMangaDetails,
  getMangaRating,
} from "@/lib/data";
import useSWR from "swr";
import MangaDetailSkeleton from "../Manga/Detail/MangaDetailSkeleton";
import {
  Button,
  ButtonGroup,
  Card,
  CardFooter,
  CardHeader,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { siteConfig } from "@/config/site";
import MangaTags from "../Manga/Detail/MangaTags/TagsChip";
import MangaDesc from "../Manga/Detail/MangaDesc";
import { ContinueReading } from "../Manga/Detail/ContinueReading";
import { LibModal } from "../Manga/Detail/AddToLib/LibModal";
import { Archive, BookOpenCheck, BookOpenText, LibraryBig } from "lucide-react";
import { MangaRating } from "../Manga/Detail/MangaRating";
import { Chapter, Manga } from "@/types";

interface MangaTestProps {
  mangaID: string;
  session?: any;
}

const MangaTest = ({ mangaID, session }: MangaTestProps) => {
  const coverURL = siteConfig.suicaodex.apiURL + "/covers";
  const {
    data: manga,
    error: mangaErr,
    isLoading: isMangaLoading,
  } = useSWR(["mangaDetails", mangaID], ([, id]) => getMangaDetails(id));

  const {
    data: latest,
    error: latestErr,
    isLoading: isLatestLoading,
  } = useSWR([mangaID, "vi", 1], ([id, lang, limit]) =>
    getChapters(id, lang, limit)
  );

  const {
    data: first,
    error: firstErr,
    isLoading: isFirstLoading,
  } = useSWR([mangaID, "vi"], ([id, lang]) => getFirstChapter(id, lang));

  const {
    data: rating,
    error: ratingErr,
    isLoading: isRatingLoading,
  } = useSWR(["mangaRating", mangaID], ([, id]) => getMangaRating(id));

  if (isMangaLoading || isLatestLoading || isFirstLoading || isRatingLoading)
    return <MangaDetailSkeleton />;

  if (mangaErr) return <div>Error...</div>;

  if (!manga) return <div>Not found...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-8">
      <Modal
        hideCloseButton
        backdrop="blur"
        defaultOpen={manga.contentRating === "pornographic"}
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
            alt={`Ảnh bìa ${manga.title}`}
            className="absolute w-full object-cover z-0 max-h-[230px] blur-sm brightness-50 "
            radius="none"
            src={`${coverURL}/${mangaID}/${manga.cover}.512.jpg`}
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
                alt={`Ảnh bìa ${manga.title}`}
                className="object-cover z-0 max-w-[200px] h-auto"
                classNames={{
                  wrapper: "bg-norepeat bg-cover bg-center",
                }}
                radius="sm"
                shadow="sm"
                src={`${coverURL}/${mangaID}/${manga.cover}.512.jpg`}
                height={300}
                width={200}
                fallbackSrc="/doro_think.webp"
              />

              <div className="flex flex-col items-start gap-2 z-10 top-1 sm:text-white">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-lg">
                  {manga.title}
                </h1>
                {manga.altTitle === manga.title ? null : (
                  <p className="text-xl font-medium text-muted-foreground drop-shadow-lg">
                    {manga.altTitle}
                  </p>
                )}
                <p className="text-sm text-muted-foreground drop-shadow-lg">
                  {manga.author === manga.artist
                    ? manga.author
                    : `${manga.author}, ${manga.artist}`}
                </p>
                <div className="flex flex-wrap gap-1">
                  <MangaTags
                    contentRating={manga.contentRating}
                    status={manga.status}
                    tags={manga.tags}
                  />
                </div>
              </div>
            </div>
          </CardHeader>

          <CardFooter className="bottom-0 flex flex-col bg-inherit items-start gap-2 z-10">
            {manga.description && <MangaDesc desc={manga.description} />}
          </CardFooter>
        </Card>

        <div className="flex flex-col md:flex-row gap-2">
          <div className="w-full md:w-1/2 max-h-fit rounded-lg shadow-small bg-content1">
            <div className="flex flex-col gap-2 p-3">
              <ContinueReading mangaId={mangaID} />

              {latest && latest[0].id && (
                <>
                  <LibModal
                    latestChapter={latest[0]}
                    manga={manga}
                    session={session}
                  />
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
                        latest[0]?.externalUrl
                          ? latest[0]?.externalUrl
                          : `/chapter/${latest[0]?.id}`
                      }
                      isExternal={latest[0]?.externalUrl ? true : false}
                      startContent={<BookOpenCheck />}
                    >
                      Đọc mới nhất
                    </Button>
                    <Button
                      as={Link}
                      className="font-semibold"
                      href={
                        first?.externalUrl
                          ? first?.externalUrl
                          : `/chapter/${first?.id}`
                      }
                      isExternal={first?.externalUrl ? true : false}
                      startContent={<BookOpenText />}
                    >
                      Đọc từ đầu
                    </Button>
                  </ButtonGroup>
                </>
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
                  href={`${siteConfig.mangadexAPI.webURL}/title/${mangaID}`}
                  isExternal={true}
                  startContent={<Archive />}
                >
                  MangaDex
                </Button>
                {manga.raw && (
                  <Button
                    as={Link}
                    className="font-semibold"
                    href={manga.raw}
                    isExternal={true}
                    startContent={<LibraryBig />}
                  >
                    Raw
                  </Button>
                )}
              </ButtonGroup>

              {rating && <MangaRating stats={rating} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaTest;
