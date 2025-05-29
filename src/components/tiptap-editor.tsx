"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "./image-upload";
import { ContentTemplates } from "./content-templates";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Eye,
  EyeOff,
  RotateCcw,
  FileText,
  Heading1,
  Heading2,
  Heading3,
  Pilcrow,
  Wand2,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
  templateCategories?: string[]; // Chỉ định categories nào được hiển thị
}

export function TiptapEditor({
  value,
  onChange,
  height = 400,
  placeholder = "Nhập nội dung...",
  templateCategories,
}: TiptapEditorProps) {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // Khởi tạo editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4",
        style: `min-height: ${height}px`,
      },
    },
  });

  // Insert image
  const addImage = useCallback(
    (url: string) => {
      if (editor && url) {
        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: "Uploaded image" })
          .run();
      }
      setShowImageUpload(false);
    },
    [editor]
  );

  // Insert link
  const setLink = useCallback(() => {
    if (editor && linkUrl) {
      // Nếu có text được chọn, thì sử dụng text đó
      if (editor.state.selection.empty && linkText) {
        // Không có text được chọn, chèn text mới với link
        editor
          .chain()
          .focus()
          .insertContent(
            `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
          )
          .run();
      } else {
        // Có text được chọn, áp dụng link vào text đó
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: linkUrl })
          .run();
      }
    }
    setLinkUrl("");
    setLinkText("");
    setShowLinkDialog(false);
  }, [editor, linkUrl, linkText]);

  // Apply template
  const handleTemplateSelect = (content: string) => {
    if (editor) {
      editor.commands.setContent(content);
    }
    setShowTemplates(false);
  };

  // Clear content
  const handleClear = () => {
    if (editor) {
      editor.commands.clearContent();
    }
  };

  // Kiểm tra nếu editor chưa được khởi tạo
  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Chọn mẫu
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Chọn mẫu nội dung</DialogTitle>
                </DialogHeader>
                <ContentTemplates
                  onSelectTemplate={handleTemplateSelect}
                  showCategories={templateCategories}
                />
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Xóa tất cả
            </Button>

            <Button
              variant={isPreview ? "default" : "ghost"}
              size="sm"
              onClick={() => setIsPreview(!isPreview)}
              className="ml-auto"
            >
              {isPreview ? (
                <EyeOff className="h-4 w-4 mr-2" />
              ) : (
                <Eye className="h-4 w-4 mr-2" />
              )}
              {isPreview ? "Chỉnh sửa" : "Xem trước"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-3">
          <Tabs defaultValue="format" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="format">Định dạng</TabsTrigger>
              <TabsTrigger value="insert">Chèn</TabsTrigger>
              <TabsTrigger value="style">Kiểu dáng</TabsTrigger>
            </TabsList>

            <TabsContent value="format" className="mt-4">
              <div className="flex flex-wrap items-center gap-1">
                {/* Text formatting */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("bold") ? "bg-slate-200" : ""
                  }`}
                  title="In đậm (Ctrl+B)"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("italic") ? "bg-slate-200" : ""
                  }`}
                  title="In nghiêng (Ctrl+I)"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("underline") ? "bg-slate-200" : ""
                  }`}
                  title="Gạch chân (Ctrl+U)"
                >
                  <Underline className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Headings */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("paragraph") ? "bg-slate-200" : ""
                  }`}
                  title="Văn bản thường"
                >
                  <Pilcrow className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("heading", { level: 1 })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Tiêu đề 1"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("heading", { level: 2 })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Tiêu đề 2"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("heading", { level: 3 })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Tiêu đề 3"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Lists */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("bulletList") ? "bg-slate-200" : ""
                  }`}
                  title="Danh sách"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive("orderedList") ? "bg-slate-200" : ""
                  }`}
                  title="Danh sách số"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="insert" className="mt-4">
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLinkDialog(true)}
                  className="h-8 px-3"
                  title="Thêm liên kết"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Liên kết
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImageUpload(true)}
                  className="h-8 px-3"
                  title="Thêm hình ảnh"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Hình ảnh
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="style" className="mt-4">
              <div className="flex flex-wrap items-center gap-1">
                {/* Alignment */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive({ textAlign: "left" }) ? "bg-slate-200" : ""
                  }`}
                  title="Căn trái"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive({ textAlign: "center" })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Căn giữa"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive({ textAlign: "right" })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Căn phải"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  className={`h-8 w-8 p-0 ${
                    editor.isActive({ textAlign: "justify" })
                      ? "bg-slate-200"
                      : ""
                  }`}
                  title="Căn đều"
                >
                  <AlignJustify className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Colors */}
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-600 mr-2">Màu chữ:</span>
                  {[
                    "#000000",
                    "#dc2626",
                    "#2563eb",
                    "#16a34a",
                    "#ca8a04",
                    "#9333ea",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        editor.chain().focus().setColor(color).run()
                      }
                      title={`Màu ${color}`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Editor Area */}
      <div className="border rounded-lg overflow-hidden">
        {isPreview ? (
          <div
            className="p-4 prose prose-sm max-w-none min-h-[200px] bg-gray-50"
            style={{ minHeight: height }}
            dangerouslySetInnerHTML={{ __html: editor.getHTML() }}
          />
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>

      {/* Helper Text */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Hướng dẫn sử dụng:</p>
            <ul className="space-y-1">
              <li>
                • <strong>Chọn mẫu</strong> để bắt đầu nhanh với nội dung có sẵn
              </li>
              <li>
                • <strong>Click vào vùng text</strong> để đặt cursor trước khi
                chèn ảnh/link
              </li>
              <li>
                • <strong>Hình ảnh</strong> cần căn chỉnh kích thước trước khi
                tải lên (hình ảnh tải lên sẽ giữ nguyên kích thước)
              </li>
              <li>
                • <strong>Chọn text</strong> trước khi format (in đậm, màu
                sắc...)
              </li>
              <li>
                • Sử dụng <strong>Ctrl+B/I/U</strong> cho format nhanh
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Image Upload Dialog */}
      <Dialog open={showImageUpload} onOpenChange={setShowImageUpload}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm hình ảnh</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              <strong>Lưu ý:</strong> Đặt cursor tại vị trí muốn chèn ảnh trước
              khi upload, hình ảnh sẽ giữ nguyên kích thước gốc.
            </div>
            <ImageUpload onImageSelect={addImage} maxSize={5} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Thêm liên kết</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded-lg">
              <strong>Lưu ý:</strong> Đặt cursor tại vị trí muốn chèn link hoặc
              chọn text để áp dụng link
            </div>
            <div>
              <Label htmlFor="link-text">
                Văn bản hiển thị (nếu không có text được chọn)
              </Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                placeholder="Ví dụ: Trang chủ VitaCare"
              />
            </div>
            <div>
              <Label htmlFor="link-url">URL</Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://vitacare.com"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowLinkDialog(false)}
              >
                Hủy
              </Button>
              <Button onClick={setLink} disabled={!linkUrl}>
                Thêm liên kết
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="bg-white shadow-lg border rounded-lg p-1 flex gap-1"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("bold") ? "bg-slate-200" : ""
            }`}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`h-8 w-8 p-0 ${
              editor.isActive("italic") ? "bg-slate-200" : ""
            }`}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLinkDialog(true)}
            className={`h-8 w-8 p-0 ${
              editor.isActive("link") ? "bg-slate-200" : ""
            }`}
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}
    </div>
  );
}
