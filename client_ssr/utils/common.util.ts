import crypto from "crypto";

export const doesKeysExistInBody = (keys: any[], body: any) => {
  return keys.every((key) => body[key]);
};

export const hashPassword = (password: string): string => {
  let md5 = crypto.createHash("md5");
  md5.update(password);
  return md5.digest("hex");
};
