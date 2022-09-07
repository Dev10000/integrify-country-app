export default function capitalize(input: string) {
  const words = input.split(' ');
  const CapitalizedWords: string[] = [];
  words.forEach((element: string) => {
    CapitalizedWords.push(
      element[0].toUpperCase() + element.slice(1, element.length)
    );
  });
  return CapitalizedWords.join(' ');
}
