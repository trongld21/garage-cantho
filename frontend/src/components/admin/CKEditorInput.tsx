'use client';
import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Heading, Link, List, BlockQuote, Table, TableToolbar, Image, ImageInsertViaUrl, ImageToolbar, ImageCaption, ImageTextAlternative } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import type { ArticleEditorProps } from './ArticleEditor';
export default function CKEditorInput({ value, onChange, disabled, licenseKey }: ArticleEditorProps & { licenseKey: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div><p role="alert" className="text-amber-300 mb-3">Chưa khởi tạo được CKEditor. Kiểm tra khóa bản quyền; nội dung vẫn được giữ bên dưới.</p><textarea aria-label="Nội dung bài viết" className="w-full min-h-80 p-4 bg-[#202020] text-white" value={value} onChange={e => onChange(e.target.value)} disabled={disabled} /></div>;
  return <div className="article-editor"><CKEditor editor={ClassicEditor} disabled={disabled} data={value} config={{
    licenseKey,
    plugins: [Essentials, Paragraph, Bold, Italic, Heading, Link, List, BlockQuote, Table, TableToolbar, Image, ImageInsertViaUrl, ImageToolbar, ImageCaption, ImageTextAlternative],
    toolbar: { items: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote', '|', 'insertTable', 'insertImageViaUrl'], shouldNotGroupWhenFull: true },
    heading: { options: [{ model: 'paragraph', title: 'Đoạn văn', class: 'ck-heading_paragraph' }, { model: 'heading2', view: 'h2', title: 'Tiêu đề 2', class: 'ck-heading_heading2' }, { model: 'heading3', view: 'h3', title: 'Tiêu đề 3', class: 'ck-heading_heading3' }] },
    image: { toolbar: ['imageTextAlternative', 'toggleImageCaption'] },
    table: { contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'] },
    link: { defaultProtocol: 'https://' },
    placeholder: 'Viết nội dung bài đăng…',
  }} onChange={(_, editor) => onChange(editor.getData())} onError={() => setFailed(true)} /></div>;
}
