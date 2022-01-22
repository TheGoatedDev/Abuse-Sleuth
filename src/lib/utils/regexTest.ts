export const isIPAddress = (value: string) =>
    /^(?:[0-9]{1,3}.){3}[0-9]{1,3}$/.test(value);
