"use client";

import type React from "react";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Eye,
  EyeOff,
  RotateCcw,
  FileText,
} from "lucide-react";
import { ImageUpload } from "./image-upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WysiwygEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  placeholder?: string;
}

// Templates có sẵn
const templates = [
  {
    id: "basic",
    name: "Mô tả cơ bản",
    content: `<h2>Giới thiệu chung</h2>
<p>Mô tả ngắn gọn về chuyên khoa...</p>

<h3>Dịch vụ chính</h3>
<ul>
<li>Dịch vụ 1</li>
<li>Dịch vụ 2</li>
<li>Dịch vụ 3</li>
</ul>

<h3>Đội ngũ chuyên gia</h3>
<p>Thông tin về đội ngũ bác sĩ...</p>`,
  },
  {
    id: "detailed",
    name: "Mô tả chi tiết",
    content: `<h2>Khoa [Tên chuyên khoa] - Chăm sóc chuyên nghiệp</h2>
<p>Khoa [Tên chuyên khoa] của VitaCare Medical là một trong những khoa hàng đầu về [lĩnh vực chuyên môn]. Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang đến dịch vụ chăm sóc sức khỏe tốt nhất.</p>

<h3>Dịch vụ chuyên khoa</h3>
<ul>
<li><strong>Khám và tư vấn:</strong> Mô tả dịch vụ</li>
<li><strong>Chẩn đoán:</strong> Mô tả dịch vụ</li>
<li><strong>Điều trị:</strong> Mô tả dịch vụ</li>
<li><strong>Theo dõi:</strong> Mô tả dịch vụ</li>
</ul>

<h3>Đội ngũ chuyên gia</h3>
<p>Khoa có đội ngũ gồm <strong>[số lượng] bác sĩ chuyên khoa</strong> với nhiều năm kinh nghiệm, trong đó có [số lượng] giáo sư, [số lượng] phó giáo sư và các bác sĩ được đào tạo tại các trường đại học y khoa hàng đầu.</p>

<h3>Trang thiết bị hiện đại</h3>
<ul>
<li>Thiết bị 1</li>
<li>Thiết bị 2</li>
<li>Thiết bị 3</li>
</ul>

<p><em>Để đặt lịch khám hoặc tư vấn, vui lòng liên hệ hotline: <strong>1900-1234</strong></em></p>`,
  },
];

export function WysiwygEditor({
  value,
  onChange,
  height = 400,
  placeholder = "Nhập nội dung...",
}: WysiwygEditorProps) {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  useEffect(() => {
    console.log("Editor value changed:", value); // Debug log
    console.log(editorRef.current?.innerHTML); // Debug log
  }, [value, editorRef.current?.innerHTML]);
  // Focus editor và đảm bảo có cursor
  const focusEditor = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.focus();

      // Nếu không có selection, tạo một selection ở cuối
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false); // Collapse to end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  }, []);

  const handleOpenImageDialog = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0));
    }
    setShowImageUpload(true);
  };

  // Insert content tại vị trí cursor hiện tại - SIMPLIFIED VERSION
  const insertContent = useCallback(
    (html: string) => {
      const editor = editorRef.current;
      if (!editor) {
        console.error("Editor ref không tồn tại");
        return;
      }

      const ensureSelection = () => {
        editor.focus();
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
          const range = document.createRange();
          range.selectNodeContents(editor);
          range.collapse(false); // Đặt cursor cuối cùng
          selection?.removeAllRanges();
          selection?.addRange(range);
          return selection;
        }
        return selection;
      };

      const selection = ensureSelection();
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null;

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const fragment = document.createDocumentFragment();
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }

      try {
        if (range) {
          range.deleteContents();
          range.insertNode(fragment);
          range.collapse(false);
          selection?.removeAllRanges();
          selection?.addRange(range);
          console.log("✅ Chèn nội dung thành công");
        } else {
          editor.innerHTML += html;
          console.warn("⚠️ Không có range, chèn vào cuối");
        }

        // Cập nhật value
        setTimeout(() => {
          onChange(editor.innerHTML);
        }, 50);
      } catch (error) {
        console.error("Lỗi khi chèn nội dung:", error);
        editor.innerHTML += html;
        onChange(editor.innerHTML);
      }
    },
    [onChange]
  );

  // Format text commands
  const execCommand = useCallback(
    (command: string, value?: string) => {
      if (!editorRef.current) return;

      focusEditor();

      try {
        document.execCommand(command, false, value);

        // Trigger onChange
        setTimeout(() => {
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        }, 10);
      } catch (error) {
        console.error("Error executing command:", error);
      }
    },
    [focusEditor, onChange]
  );

  // Format handlers
  const handleBold = () => execCommand("bold");
  const handleItalic = () => execCommand("italic");
  const handleUnderline = () => execCommand("underline");
  const handleBulletList = () => execCommand("insertUnorderedList");
  const handleNumberedList = () => execCommand("insertOrderedList");
  const handleAlignLeft = () => execCommand("justifyLeft");
  const handleAlignCenter = () => execCommand("justifyCenter");
  const handleAlignRight = () => execCommand("justifyRight");

  // Heading
  const handleHeading = (level: string) => {
    execCommand("formatBlock", level === "div" ? "div" : `h${level}`);
  };

  // Color
  const handleTextColor = (color: string) => {
    execCommand("foreColor", color);
  };

  // Handle content change - DEBOUNCED
  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // Handle input - SIMPLIFIED
  const handleInput = useCallback((e: React.FormEvent) => {
    // Không gọi handleContentChange ngay lập tức để tránh cursor jump
    // Chỉ update khi blur hoặc sau delay
  }, []);

  // Handle editor focus
  const handleEditorFocus = () => {
    setIsEditorFocused(true);
  };

  const handleEditorBlur = () => {
    setIsEditorFocused(false);
    // Chỉ update onChange khi blur
    handleContentChange();
  };

  // Insert image - FIXED
  const handleImageSelect = (imageUrl: string) => {
    console.log("Image URL received, length:", imageUrl.length); // Debug log
    if (imageUrl) {
      // Đơn giản hóa HTML - không dùng <p> wrapper
      const imgHtml = `<img src="${imageUrl}" alt="Uploaded image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; display: block;" />`;
      insertContent(imgHtml);
    }
    setShowImageUpload(false);
  };

  // Insert link - FIXED
  const handleLinkInsert = () => {
    if (linkUrl && linkText) {
      const linkHtml = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; text-decoration: underline;">${linkText}</a>`;
      insertContent(linkHtml);
      console.log("Link inserted:", linkHtml); // Debug log
    }

    setLinkUrl("");
    setLinkText("");
    setShowLinkDialog(false);
  };

  // Apply template
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template && editorRef.current) {
      editorRef.current.innerHTML = template.content;
      onChange(template.content);
      focusEditor();
    }
    setSelectedTemplate("");
  };

  // Clear content
  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      onChange("");
      focusEditor();
    }
  };

  // Sync value với editor khi value thay đổi từ bên ngoài - IMPROVED
  useEffect(() => {
    if (editorRef.current && !isEditorFocused) {
      // Chỉ sync khi không focus và content thực sự khác
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, isEditorFocused]);

  return (
    <div className="space-y-4">
      {/* Templates */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label className="text-sm font-medium">Mẫu có sẵn:</Label>
            <Select
              value={selectedTemplate}
              onValueChange={handleTemplateSelect}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Chọn mẫu..." />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={handleClear}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Xóa tất cả
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
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleBold}
                  className="h-8 w-8 p-0"
                  title="In đậm (Ctrl+B)"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleItalic}
                  className="h-8 w-8 p-0"
                  title="In nghiêng (Ctrl+I)"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleUnderline}
                  className="h-8 w-8 p-0"
                  title="Gạch chân (Ctrl+U)"
                >
                  <Underline className="h-4 w-4" />
                </Button>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Headings */}
                <Select onValueChange={handleHeading}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="Tiêu đề" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="div">Văn bản thường</SelectItem>
                    <SelectItem value="1">Tiêu đề 1</SelectItem>
                    <SelectItem value="2">Tiêu đề 2</SelectItem>
                    <SelectItem value="3">Tiêu đề 3</SelectItem>
                  </SelectContent>
                </Select>

                <Separator orientation="vertical" className="h-6 mx-1" />

                {/* Lists */}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleBulletList}
                  className="h-8 w-8 p-0"
                  title="Danh sách"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleNumberedList}
                  className="h-8 w-8 p-0"
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
                  onClick={() => {
                    setShowLinkDialog(true);
                  }}
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
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const testImageUrl =
                      "/placeholder.svg?height=200&width=300";
                    const imgHtml = `<img src="${testImageUrl}" alt="Test image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 16px 0; display: block;" /><br>`;
                    insertContent(imgHtml);
                  }}
                  className="h-8 px-3"
                  title="Test chèn ảnh"
                >
                  🧪 Test ảnh
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
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleAlignLeft}
                  className="h-8 w-8 p-0"
                  title="Căn trái"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleAlignCenter}
                  className="h-8 w-8 p-0"
                  title="Căn giữa"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleAlignRight}
                  className="h-8 w-8 p-0"
                  title="Căn phải"
                >
                  <AlignRight className="h-4 w-4" />
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
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleTextColor(color)}
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
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Nội dung</Label>
          <Button
            type="button"
            variant={isPreview ? "default" : "ghost"}
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? (
              <EyeOff className="h-4 w-4 mr-2" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {isPreview ? "Chỉnh sửa" : "Xem trước"}
          </Button>
        </div>

        <div className="border rounded-lg overflow-hidden">
          {isPreview ? (
            <div
              className="p-4 prose prose-sm max-w-none min-h-[200px] bg-gray-50"
              style={{ minHeight: height }}
            >
              <div dangerouslySetInnerHTML={{ __html: value }} />
            </div>
          ) : (
            <div
              ref={editorRef}
              contentEditable
              className="p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset prose prose-sm max-w-none"
              style={{ minHeight: height }}
              onInput={handleInput}
              onFocus={handleEditorFocus}
              onBlur={handleEditorBlur}
              suppressContentEditableWarning={true}
              data-placeholder={placeholder}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          )}
        </div>
      </div>

      {/* Helper Text */}
      <div className="bg-blue-50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <FileText className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-xs text-blue-800">
            <p className="font-medium mb-1">Hướng dẫn sử dụng:</p>
            <ul className="space-y-1">
              <li>
                • <strong>Click vào vùng text</strong> để đặt cursor trước khi
                chèn ảnh/link
              </li>
              <li>
                • <strong>Chọn text</strong> trước khi format (in đậm, màu
                sắc...)
              </li>
              <li>
                • <strong>Ảnh và link</strong> sẽ chèn tại vị trí cursor hiện
                tại
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
              khi upload
            </div>
            <ImageUpload onImageSelect={handleImageSelect} maxSize={5} />
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
              <strong>Lưu ý:</strong> Đặt cursor tại vị trí muốn chèn link trước
              khi mở dialog này
            </div>
            <div>
              <Label htmlFor="link-text">Văn bản hiển thị</Label>
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
              <Button
                onClick={handleLinkInsert}
                disabled={!linkUrl || !linkText}
              >
                Thêm liên kết
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }

        [contenteditable] h1,
        [contenteditable] h2,
        [contenteditable] h3 {
          font-weight: bold;
          margin: 16px 0 8px 0;
        }

        [contenteditable] h1 {
          font-size: 1.5em;
        }
        [contenteditable] h2 {
          font-size: 1.3em;
        }
        [contenteditable] h3 {
          font-size: 1.1em;
        }

        [contenteditable] p {
          margin: 8px 0;
          line-height: 1.6;
        }

        [contenteditable] ul,
        [contenteditable] ol {
          margin: 8px 0;
          padding-left: 24px;
        }

        [contenteditable] li {
          margin: 4px 0;
        }

        [contenteditable] strong {
          font-weight: bold;
        }

        [contenteditable] em {
          font-style: italic;
        }

        [contenteditable] a {
          color: #2563eb;
          text-decoration: underline;
        }

        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 8px 0;
          display: block;
        }
      `}</style>
    </div>
  );
}
