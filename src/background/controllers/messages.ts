import { MessagesOneWay } from "../../chrome-api/messages";

export const openEyedropperChannel = new MessagesOneWay("open-eyedropper");

export const storeColorChannel = new MessagesOneWay<{
  color: string;
}>("store-color");

// define static methods here
export class MessageHandler {}
