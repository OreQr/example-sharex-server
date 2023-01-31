const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

export const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";

  const dm = decimals < 0 ? 0 : decimals;

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(dm))} ${sizes[i]}`;
};

export const formatSize = (size: string, decimals = 2) => {
  const dm = decimals < 0 ? 0 : decimals;
  const i = sizes.indexOf(size.slice(-2));

  return parseFloat(
    (Number(size.toUpperCase().slice(0, -2)) * Math.pow(1024, i)).toFixed(dm)
  );
};
