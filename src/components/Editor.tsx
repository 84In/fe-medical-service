"use client";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      BulletList,
      OrderedList,
      Link,
      Placeholder.configure({ placeholder: "Viết gì đó..." }),
    ],
    content: "<p>Hello TipTap với Toolbar!</p>",
  });

  const [url, setUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  if (!editor) {
    return null;
  }

  // Hàm toggle link
  const addLink = () => {
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setUrl("");
    setShowLinkInput(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded border-gray-300">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bold") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          aria-label="Bold"
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("italic") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          aria-label="Italic"
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("underline")
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          aria-label="Underline"
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          aria-label="Bullet List"
        >
          • List
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-3 py-1 rounded ${
            editor.isActive("orderedList")
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
          aria-label="Ordered List"
        >
          1. List
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="px-3 py-1 rounded bg-gray-200"
          aria-label="Undo"
        >
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="px-3 py-1 rounded bg-gray-200"
          aria-label="Redo"
        >
          Redo
        </button>

        <button
          onClick={() => setShowLinkInput(!showLinkInput)}
          className={`px-3 py-1 rounded ${
            editor.isActive("link") ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          aria-label="Link"
        >
          Link
        </button>
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="mb-2 flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Nhập URL"
            className="border rounded px-2 py-1 flex-grow"
          />
          <button
            onClick={addLink}
            className="bg-blue-600 text-white px-3 rounded"
            aria-label="Add Link"
          >
            Thêm
          </button>
        </div>
      )}

      {/* Editor content */}
      <div className="border border-gray-300 rounded p-3 min-h-[200px] prose prose-sm max-w-full">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
