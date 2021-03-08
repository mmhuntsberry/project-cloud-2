import { CheckmarkOutline20, CloseOutline20 } from "@carbon/icons-react";

export const hasLowerCase = (str) => /[a-z]/.test(str);
export const hasUpperCase = (str) => /[A-Z]/.test(str);
export const hasNumber = (str) => /.*[0-9].*/.test(str);
export const hasLengthBetween8and32 = (str) =>
  str.length >= 8 && str.length <= 32;
export const hasSpecialCharacters = (str) => {
  if (str.length === 0) return undefined;

  return /^[^`\\;:{"?)<>\s]*$/.test(str);
};

export const buildPasswordConstraints = (password) => {
  const passwordConstraints = [
    {
      id: 1,
      constraint: hasLengthBetween8and32,
      text: "8-31 characters",
      className: {
        success: "hasLengthSuccess",
        error: "hasLengthError",
      },
      successIcon: CheckmarkOutline20,
      errorIcon: CheckmarkOutline20,
    },
    {
      id: 2,
      constraint: hasUpperCase,
      text: "One uppercase character",
      className: {
        success: "hasUpperCaseSuccess",
        error: "hasUpperCaseError",
      },
      successIcon: CheckmarkOutline20,
      errorIcon: CheckmarkOutline20,
    },
    {
      id: 3,
      constraint: hasLowerCase,
      text: "One lowercase character",
      className: {
        success: "hasLowerCaseSuccess",
        error: "hasLowerCaseError",
      },
      successIcon: CheckmarkOutline20,
      errorIcon: CheckmarkOutline20,
    },
    {
      id: 4,
      constraint: hasNumber,
      text: "One number",
      className: {
        success: "hasNumberSuccess",
        error: "hasNumberError",
      },
      successIcon: CheckmarkOutline20,
      errorIcon: CheckmarkOutline20,
    },

    {
      id: 5,
      constraint: hasSpecialCharacters,
      text: 'Cannot contain space or `\\;:{"?)<>',
      className: {
        success: "hasSpecialCharactersSuccess",
        error: "hasSpecialCharactersError",
      },
      successIcon: CheckmarkOutline20,
      errorIcon: CloseOutline20,
    },
  ].map(({ id, constraint, text, className, successIcon, errorIcon }) => {
    return {
      id,
      constraint: constraint(password),
      text,
      className,
      successIcon,
      errorIcon,
    };
  });

  return passwordConstraints;
};

export const removeAllNonDigitValues = (str) => str.replace(/[^\d]/gi, "");
export const formatCard = (creditCardNumber) => {
  const cc = removeAllNonDigitValues(creditCardNumber);

  // --- Masking ---

  // Format: 5555 5555 5555 5555
  const genericCreditRegex = /(\d{4})(\d{1,4})?(\d{1,4})?(\d{1,4})?\d*/;
  // Format: 5555 55555 55555
  const amexRegex = /(\d{4})(\d{1,6})?(\d{1,5})?\d*/;

  // Decide the type of Masking
  const cardType = getCardType(cc);
  let maskRegex = cardType === "AmEx" ? amexRegex : genericCreditRegex;

  return cc.replace(maskRegex, (_, ...captureGroups) => {
    let output = "";
    const spacer = " "; // What we put between each part

    const [p1, p2, p3, p4] = captureGroups;
    if (p1) output = p1;
    if (p2) output += `${spacer}${p2}`;
    if (p3) output += `${spacer}${p3}`;
    if (p4) output += `${spacer}${p4}`;
    return output;
  });
};

export const getCardType = (str) => {
  const cc = removeAllNonDigitValues(str);

  if (/^4\d+$/.test(cc)) {
    return "Visa";
  } else if (/^5[1-5]\d+$/.test(cc) || /^2[2-7]\d+$/.test(cc)) {
    return "Mastercard";
  } else if (/^3[47]\d+$/.test(cc)) {
    return "AmEx";
  } else if (/^6(?:011|5[0-9]{2})\d+$/.test(cc)) {
    return "Discover";
  }
};

export const isValidCardType = (str) => {
  const cc = removeAllNonDigitValues(str);

  if (
    /^4\d+$/.test(cc) ||
    /^5[1-5]\d+$/.test(cc) ||
    /^2[2-7]\d+$/.test(cc) ||
    /^3[47]\d+$/.test(cc) ||
    /^6(?:011|5[0-9]{2})\d+$/.test(cc)
  ) {
    return true;
  }

  return false;
};

export function creditCardExpiresFormat(string) {
  return string
    .replace(
      /[^0-9]/g,
      "" // To allow only numbers
    )
    .replace(
      /^([2-9])$/g,
      "0$1" // To handle 3 > 03
    )
    .replace(
      /^(1{1})([3-9]{1})$/g,
      "0$1/$2" // 13 > 01/3
    )
    .replace(
      /^0{1,}/g,
      "0" // To handle 00 > 0
    )
    .replace(
      /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g,
      "$1/$2" // To handle 113 > 11/3
    );
}
