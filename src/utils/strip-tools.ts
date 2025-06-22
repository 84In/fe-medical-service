export const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>/g, "");
};
