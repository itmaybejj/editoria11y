# Editoria11y demo

[« Back to the documentation](https://itmaybejj.github.io/editoria11y/)

This page simulates what an *author* would experience if they were logged in to a site with Editoria11y installed: a toggle automatically appears in the lower-right-hand corner of the page with an issue count. Normally it is an innocuous little a11y symbol; since there were critical issues detected on this page it has become a red explanation point.

1. Click the toggle to open the info panel and highlight all the obvious content issues on the page.
2. Then click the "Outline" button on the panel to reveal the document's hidden structure and text alternatives.

Note that the info panel and contextual highlighting can be set to activate *automatically* when new issues were found; that was turned off for this demo so you could read this intro first!

## Heading Tests

### 1. Empty headings

This heading has no text:

<h3></h3>

### Skipped heading levels

###### This H6 should have been an H3

### Suspiciously long headings

#### A very long heading. Headings should not be used for emphasis, but rather for a document outline, so if you find yourself talking this much, this probably is being used for visual formatting, not a heading.

### Suspiciously short blockquotes that maybe should be headings

<blockquote>Not a blockquote</blockquote>

### Suspicious paragraphs that look like headings

<strong>This looks suspiciously like a heading</strong>

Note that this test only flags an all-bold paragraph that has no punctuation at all,

<strong>so this paragraph will not be flagged as a false positive.</strong>

## Text alternatives

### Image with no alt attribute at all

Screen readers end up reading this as a filename.

<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Image marked as decorative with an empty alt

This might be OK; flagged as needing manual review.

<img alt="" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Image with an invalid alt attribute

E.g., `alt="'"`

<img alt="'" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Image with a filename as an alt

<img alt="filename.jpg" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Image with redundant text in its alt

E.g., "image of."

<img alt="Image of a photo of a picture." src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Image with very long alt text

<img alt="Alt text should be brief. Screen readers cannot jump from sentence to sentence in alt text, so listeners just hear one monster pile of text and if they miss something they have to start over." src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

### Images in links where the alt text may be describing the image instead of the link

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">This link has text and an image.<img alt="A lovely gray box" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E"></a>

### Embeds

Flagged as manual check needed for captioning:

<iframe width="300" height="240" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Also flagged: embedded audio and social media.

## Meaningful Links

### Links with no text at all

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs"></a>

### Links titled with a URL

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">https://www.youtube.com/watch?v=DLzxrzFCyOs</a>

### Links only titled with generic text

“Click here,” “learn more,” “download,” etc.

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">Click here</a>

### Links that open in a new window without an external link icon or text warning

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs" target="_blank">An informative video.</a>

### Links to a documents

Note that you can set what Editoria11y should look for in your preferences file. By default it checks for PDF and DOC files.

<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ#.pdf">A fake PDF link.</a>

## Tables

### Tables without valid headers

<table><tr><td>A table without a TH header is invalid</td><td><h3>And no, an "H3" does not count.</h3></td></tr></table>

### Empty table header cells

<table><tr><th>Empty table heading cells will also be flagged:</th><th></th></tr></table>


## Legibility

### Lists

a. Fake lists

b. use letters or numbers.

c. rather than real formatting.

### Caps lock

SEVERAL WORDS IN A ROW OF CAPS LOCK TEXT WILL TRIGGER A MANUAL CHECK WARNING.




<div hidden><style>img {max-width: 240px; width: 50%;}#project_title {text-transform: capitalize;}.inner{max-width:50rem;}li{margin-top:.75rem;}section h2,section h3,section h4{padding-top:1em;}</style><link rel="stylesheet" media="screen" href="{{ site.baseurl}}/css/editoria11y.css">
<script src="{{ site.baseurl}}/dist/editoria11y.min.js"></script>
            <!-- Instantiate-->
            <script>
              if (window.navigator.userAgent.match(/MSIE|Trident/) === null) {
                // TODO mvp Need to replace this with a test for ECMA level
                const ed11y = new Ed11y({
                    alertMode : 'polite',
                    ignoreElements : '.project-tagline *',
                    checkRoots : 'main',
                });
              }
            </script></div>