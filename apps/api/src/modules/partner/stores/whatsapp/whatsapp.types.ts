export interface IWhatsappInteractiveList {
  phoneNumberId: string;
  to: string;
  headerText: string;
  bodyText: string;
  footerText: string;
  buttonText: string;
  sections: {
    title: string;
    rows: { id: string; title: string; description?: string }[];
  }[];
  accessToken: string;
}
