interface CommentCardProps {
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
}

export default function RandomCmts(
  comments: CommentCardProps[],
  count: number = 7
): CommentCardProps[] {
  const shuffled = comments.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export const commentData: CommentCardProps[] = [
  {
    user: {
      name: "Sakura Ito",
      avatar: "https://loremflickr.com/120/120/cat",
    },
    content:
      "Thực sự không ngờ tình tiết này lại xuất hiện. Mình cứ nghĩ mọi chuyện sẽ đi theo hướng cũ, nhưng cú twist này đúng là bất ngờ thật sự. Tác giả đúng là thiên tài khi khiến người đọc phải suy ngẫm nhiều như vậy! 👏",
    updatedAt: "2024-12-09T09:30:00Z",
    upvotes: 95,
    downvotes: 3,
  },
  {
    user: {
      name: "Ren Hoshino",
      avatar: "https://loremflickr.com/120/120/catg",
    },
    content:
      "Tuy hơi hụt hẫng với đoạn kết, nhưng mình vẫn thấy hành trình này thực sự đáng nhớ. Có những khoảnh khắc làm mình rơi nước mắt vì sự hy sinh và tình yêu thương giữa các nhân vật. Thật đáng trân trọng! 😢",
    updatedAt: "2024-12-08T21:45:00Z",
    upvotes: 132,
    downvotes: 7,
  },
  {
    user: {
      name: "Yuki Arai",
      avatar: "https://loremflickr.com/120/120/cat?random=1",
    },
    content:
      "Cảnh chiến đấu siêu mãn nhãn luôn! Chưa từng nghĩ mình sẽ phấn khích thế này khi đọc một trận đấu, thật sự không thể dừng lại được. 😍🔥",
    updatedAt: "2024-12-08T14:30:00Z",
    upvotes: 112,
    downvotes: 4,
  },
  {
    user: {
      name: "Mai Fujimoto",
      avatar: "https://loremflickr.com/120/120/cat?random=2",
    },
    content:
      "Mình thích cách xây dựng nhân vật chính: không hoàn hảo, đầy khiếm khuyết nhưng cực kỳ đáng yêu và chân thật. Hành trình trưởng thành này làm mình nhớ lại tuổi trẻ của mình, khi mà mọi thứ đều có vẻ bất khả thi nhưng lại tràn đầy hy vọng. 🌱",
    updatedAt: "2024-12-07T20:00:00Z",
    upvotes: 140,
    downvotes: 5,
  },
  {
    user: {
      name: "Kaito Yamamoto",
      avatar: "https://loremflickr.com/120/120/cat?random=3",
    },
    content:
      "Đọc đến đoạn này mà mình không kìm được nước mắt. Tình cảm giữa các nhân vật được thể hiện quá sâu sắc, đặc biệt là lúc chia tay... Cảm giác như mình cũng mất mát một điều gì đó quan trọng. 💔",
    updatedAt: "2024-12-07T16:15:00Z",
    upvotes: 152,
    downvotes: 2,
  },
  {
    user: {
      name: "Aki Nishida",
      avatar: "https://loremflickr.com/120/120/cat?random=4",
    },
    content:
      "Đơn giản là: Đỉnh của chóp! 😎💯 Không còn từ nào để diễn tả độ chất lượng của đoạn này nữa.",
    updatedAt: "2024-12-06T12:00:00Z",
    upvotes: 97,
    downvotes: 6,
  },
  {
    user: {
      name: "Riku Sasaki",
      avatar: "https://loremflickr.com/120/120/cat?random=5",
    },
    content:
      "Phải nói là những chi tiết ẩn được lồng ghép quá khéo léo. Đọc xong mà mình phải lật lại vài chap cũ để kiểm tra và đúng thật, mọi thứ đã được báo trước từ lâu. Tác giả quá tinh tế và đầu tư! 👏👏",
    updatedAt: "2024-12-06T18:30:00Z",
    upvotes: 128,
    downvotes: 4,
  },
  {
    user: {
      name: "Nao Shimizu",
      avatar: "https://loremflickr.com/120/120/cat?random=6",
    },
    content:
      "Đoạn hội thoại trong chap này sâu sắc quá, khiến mình suy nghĩ rất nhiều về cách đối nhân xử thế trong cuộc sống. 🧐",
    updatedAt: "2024-12-05T13:45:00Z",
    upvotes: 89,
    downvotes: 5,
  },
  {
    user: {
      name: "Tomoka Matsuda",
      avatar: "https://loremflickr.com/120/120/cat?random=7",
    },
    content:
      "Tình tiết tưởng chừng như đơn giản nhưng lại để lại nhiều suy ngẫm. Đây không chỉ là một câu chuyện, mà còn là bài học cuộc sống. Cảm ơn tác giả vì đã tạo ra một tác phẩm ý nghĩa như vậy. 🙏",
    updatedAt: "2024-12-05T22:30:00Z",
    upvotes: 122,
    downvotes: 6,
  },
  {
    user: {
      name: "Hana Takeda",
      avatar: "https://loremflickr.com/120/120/cat?random=8",
    },
    content:
      "Mình thích nhất là cách câu chuyện kết hợp giữa hành động và cảm xúc. Những khoảnh khắc nhỏ, như khi nhân vật chỉ đơn giản là mỉm cười với nhau, lại có sức mạnh rất lớn. ✨",
    updatedAt: "2024-12-04T19:00:00Z",
    upvotes: 144,
    downvotes: 3,
  },
  {
    user: {
      name: "Keisuke Endo",
      avatar: "https://loremflickr.com/120/120/cat?random=9",
    },
    content:
      "Nhân vật phản diện lần này thật sự gây ấn tượng. Không quá mạnh mẽ, nhưng cách suy nghĩ và động cơ của họ rất thuyết phục. 👏",
    updatedAt: "2024-12-04T10:30:00Z",
    upvotes: 105,
    downvotes: 4,
  },
  {
    user: {
      name: "Yoko Tsukamoto",
      avatar: "https://loremflickr.com/120/120/cat?random=10",
    },
    content:
      "Điều mình thích nhất ở câu chuyện này là cách tác giả không ngại làm tổn thương nhân vật chính. Điều đó làm mọi thứ chân thật hơn rất nhiều. Đôi khi, cuộc sống cũng cần những vết đau để trưởng thành. 💔🌸",
    updatedAt: "2024-12-03T14:00:00Z",
    upvotes: 136,
    downvotes: 8,
  },
  {
    user: {
      name: "Shiro Kuroda",
      avatar: "https://loremflickr.com/120/120/cat?random=11",
    },
    content:
      "Một kết thúc tuyệt vời, không quá hoàn hảo nhưng rất thỏa mãn. Chỉ tiếc là bây giờ mình phải tìm gì đó để lấp khoảng trống sau khi đọc xong. 😭",
    updatedAt: "2024-12-03T19:45:00Z",
    upvotes: 131,
    downvotes: 6,
  },
  {
    user: {
      name: "Mika Kawaguchi",
      avatar: "https://loremflickr.com/120/120/cat?random=12",
    },
    content:
      "Mình không biết phải diễn tả thế nào, nhưng cảm xúc lúc này thật sự khó tả. Vừa buồn, vừa vui, vừa tiếc nuối. 🥲",
    updatedAt: "2024-12-02T11:15:00Z",
    upvotes: 87,
    downvotes: 3,
  },
  {
    user: {
      name: "kfp afang",
      avatar:
        "https://cdn.discordapp.com/avatars/441789446342574090/b659dbc8b821e00c1e11663d90edc7f7.webp?size=128",
    },
    content:
      "Vài thành viên trong server Động Moè nói rằng họ không thích SuicaoDex, giờ thì họ không còn là thành viên Động Moè nữa.",
    updatedAt: "2024-12-02T17:30:00Z",
    upvotes: 98,
    downvotes: 2,
  },
  {
    user: {
      name: "j97",
      avatar: "https://loremflickr.com/120/120/cat?random=13",
    },
    content:
      "con gái tôi đọc truyện trên Cuutruyen chứ không phải SuicaoDex, và điều gì xảy ra tiếp theo thì ai cũng biết.",
    updatedAt: "2024-12-01T14:30:00Z",
    upvotes: 112,
    downvotes: 4,
  },
  {
    user: {
      name: "Ren Yamashiro",
      avatar: "https://loremflickr.com/120/120/cat?random=14",
    },
    content:
      "Tôi từng giao chiến với chủ web SuicaoDex, người thua phải làm chó.",
    updatedAt: "2024-12-01T20:00:00Z",
    upvotes: 121,
    downvotes: 5,
  },
  {
    user: {
      name: "KongFuong-san",
      avatar: "https://loremflickr.com/120/120/cat?random=15",
    },
    content:
      "Truyện trên SuicaoDex hay đến nỗi tôi vừa đọc vừa ăn hết 4 đĩa gà rán.",
    updatedAt: "2024-12-01T20:00:00Z",
    upvotes: 121,
    downvotes: 5,
  },
  {
    user: {
      name: "CR7",
      avatar: "https://loremflickr.com/120/120/cat?random=15",
    },
    content:
      "SIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU!!!!!!",
    updatedAt: "2024-12-01T20:00:00Z",
    upvotes: 121,
    downvotes: 5,
  },
];
