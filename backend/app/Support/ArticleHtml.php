<?php
namespace App\Support;
use Symfony\Component\HtmlSanitizer\HtmlSanitizer;
use Symfony\Component\HtmlSanitizer\HtmlSanitizerConfig;
final class ArticleHtml {
    public static function clean(?string $html): string {
        $html ??= '';
        if (!preg_match('/<[a-z][^>]*>/i', $html)) {
            $html = '<p>'.nl2br(htmlspecialchars($html, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')).'</p>';
        }
        $config = (new HtmlSanitizerConfig())
            ->allowLinkSchemes(['https', 'http', 'mailto', 'tel'])
            ->allowMediaSchemes(['https', 'http'])
            ->allowRelativeLinks()->allowRelativeMedias()
            ->withMaxInputLength(200000);
        foreach (['p','br','h2','h3','h4','strong','b','em','i','u','s','ul','ol','li','blockquote','table','thead','tbody','tr','figcaption'] as $tag) {
            $config = $config->allowElement($tag);
        }
        $config = $config->allowElement('a', ['href', 'title'])->forceAttribute('a', 'rel', 'noopener noreferrer')
            ->allowElement('img', ['src','alt','width','height'])
            ->allowElement('figure', ['class'])->allowElement('td', ['colspan','rowspan'])->allowElement('th', ['colspan','rowspan']);
        foreach (['script','style','iframe','object','embed','svg','math','form','input','button','textarea'] as $tag) {
            $config = $config->dropElement($tag);
        }
        return (new HtmlSanitizer($config))->sanitize($html);
    }
}
