import { Editor } from "@tinymce/tinymce-react";
import { HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Editor as TinyMCEEditor } from "tinymce";

import FormElementError from "@components/Form/FormElementError";

import FormElementLabel from "../FormElementLabel";
import EditorInsertImageModal from "./EditorInsertImageModal";
import UncontrolledEditorFullscreenHeader from "./UncontrolledEditorFullscreenHeader";

export interface UncontrolledEditorProps extends Omit<HTMLAttributes<HTMLInputElement>, "onChange"> {
  isRequired?: boolean;
  name: string;
  className?: string;
  error?: string;
  label?: string | null;
  value?: string;
  fullScreenTitle?: string | null;
  onChange?: (value: string) => void;
}

const UncontrolledEditor = ({
  isRequired = false,
  label,
  error,
  value,
  fullScreenTitle,
  onChange,
}: UncontrolledEditorProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFocusing, setIsFocusing] = useState(false);
  const [isOpenInsertImageModal, setIsOpenInsertImageModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const tinyEditorRef = useRef<TinyMCEEditor | null>(null);
  const rawEditorRef = useRef<Editor | null>(null);

  const handleChange = useCallback((editorValue: string) => {
    onChange?.(editorValue);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpenInsertImageModal(false);
  }, []);

  const handleInsetImage = useCallback((images: string[], caption?: string) => {
    if (!tinyEditorRef.current) {
      return;
    }

    const imageHtml = images
      .map((image) => `<img class="w-full aspect-video" src="${image}" alt="${caption ?? ""}" />`)
      .join("");
    let html = "";

    if (caption) {
      html = `<p><figure>${imageHtml}<figcaption>${caption}</figcaption></figure></p>`;
    } else {
      html = imageHtml;
    }

    tinyEditorRef.current.execCommand("mceInsertContent", false, html);
    tinyEditorRef.current.execCommand("mceInsertNewLine");

    handleCloseModal();
  }, []);

  const handleSetup = useCallback((editor: unknown) => {
    const editorInstance = editor as TinyMCEEditor;

    editorInstance.ui.registry.addButton("image", {
      icon: "image",
      tooltip: "Insert Image",
      onAction: () => setIsOpenInsertImageModal(true),
    });
  }, []);

  const handleInit = useCallback((_: unknown, editor: unknown) => {
    tinyEditorRef.current = editor as TinyMCEEditor;
    setIsInitialized(true);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocusing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocusing(false);
    setIsFullScreen(false);
  }, []);

  const handleEnterFullscreen = useCallback(() => {
    if (!tinyEditorRef.current) {
      return;
    }

    tinyEditorRef.current.execCommand("mceFullScreen");
    setIsFullScreen(true);
  }, []);

  const handleExitFullscreen = useCallback(() => {
    if (!tinyEditorRef.current) {
      return;
    }

    tinyEditorRef.current.execCommand("mceFullScreen");

    const formSubmitButton: HTMLButtonElement | null = document.querySelector("form button[type=submit]");

    if (formSubmitButton) {
      formSubmitButton.focus();
    }

    setIsFullScreen(false);
  }, []);

  useEffect(() => {
    if (isFocusing) {
      handleEnterFullscreen();
    }
  }, [isFocusing]);

  return (
    <>
      <div className="tiny-mce-editor">
        {label && <FormElementLabel label={label} isRequired={isRequired} error={error} />}
        {!isInitialized && (
          <div className="h-72 animate-pulse rounded-lg border-2 border-gray-100 bg-gray-100" />
        )}
        {isFullScreen && (
          <UncontrolledEditorFullscreenHeader title={fullScreenTitle} onClose={handleExitFullscreen} />
        )}
        <div
          className={twMerge(
            "rounded-lg border-2 border-gray-100 hover:border-gray-200",
            isFocusing && "border-blue-500 hover:border-blue-500",
            !isInitialized && "hidden",
            error && "border-red-500 hover:border-red-500",
          )}
        >
          <Editor
            apiKey={process.env.REACT_APP_RE_DASH_APP_TINY_API_KEY ?? ""}
            ref={rawEditorRef}
            value={value}
            init={{
              height: 288,
              menubar: false,
              plugins: ["fullscreen", "lists", "table", "quickbars"],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "image | " +
                "table tableprops | " +
                "removeformat | help",
              content_style:
                "body { font-family: Source Sans Pro,sans-serif; font-size: 14px } img { max-width: 100%; }",
              quickbars_insert_toolbar: false,
              quickbars_selection_toolbar:
                "bold italic underline | blocks | bullist numlist | blockquote quicklink",
              contextmenu: "undo redo | inserttable | cell row column deletetable | help",
              setup: handleSetup,
            }}
            onEditorChange={handleChange}
            onInit={handleInit}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {error && <FormElementError error={error} />}
      </div>
      <EditorInsertImageModal
        isOpen={isOpenInsertImageModal}
        onClose={handleCloseModal}
        onConfirm={handleInsetImage}
      />
    </>
  );
};

export default UncontrolledEditor;
