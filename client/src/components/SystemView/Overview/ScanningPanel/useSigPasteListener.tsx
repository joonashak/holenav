const useSigPasteListener = () => {
  const sigPasteListener = (event: Event) => {
    console.log((event as ClipboardEvent).clipboardData?.getData("text"));
  };

  return {
    sigPasteListener,
  };
};

export default useSigPasteListener;
