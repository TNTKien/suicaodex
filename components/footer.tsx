export default function Footer() {
  return (
    <footer
      className="text-sm text-center bg-[#ff6740]"
      onClick={() => {
        //hide footer
        document.querySelector("footer")!.style.display = "none";
      }}
    >
      <p>&copy; {new Date().getFullYear()} MangaDex</p>
    </footer>
  );
}
