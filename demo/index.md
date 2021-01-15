# Editoria11y demo

[« Back to the documentation](https://itmaybejj.github.io/editoria11y/)

Click the toggle in the right-hand corner of this page to highlight all the obvious content issues on the page.

Then click the "Full check" button on the panel to run some additional tests and reveal the document's hidden structure and text alternatives.


## Text alternatives

Image with no alt: 

<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

Image with a filename as an alt:

<img alt="filename.jpg" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

Image with very long alt text:

<img alt="Alt text should be brief. Screen readers cannot jump from sentence to sentence in alt text, so listeners just hear one monster pile of text and if they miss something they have to start over." src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

Image with redundant text in the alt:

<img alt="Image of a photo of a picture." src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E">

Images in links where the alt text may be describing the image instead of the link:

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">This link has text and an image.<img alt="A lovely gray box" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E"></a>

Also: embedded visualizations that usually require a text alternative (hard to demonstrate on GitHub).

## Meaningful Links

Links with no text:

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs"></a>

Links titled with a URL:

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">https://www.youtube.com/watch?v=DLzxrzFCyOs</a>

Links only titled with only generic text: “click here,” “learn more,” “download,” etc.

<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs">Click here</a>

Links that open in a new window without an external link icon
<a href="https://www.youtube.com/watch?v=DLzxrzFCyOs" target="_blank">Yeah you can guess where this link goes.</a>

## List formatting

a. Fake lists

b. use letters or numbers.

c. rather than real formatting.

## Caps lock

SEVERAL WORDS IN A ROW OF CAPS LOCK TEXT

## Tables

<table><tr><td>A table without a header isn't really a table</td><td><h3>And no, an "H3" is not a table header.</h3></td></tr></table>

<table><tr><th>Empty table heading cells will also be flagged</th><th></th></tr></table>


## Headings

#### A skipped heading level

An empty heading:
<h3></h3>

### A very long heading. Headings should not be used for emphasis, but rather for a document outline, so if you find yourself talking this much, this probably is being used for visual formatting, not a heading.

## Full check additional tests

Links to PDF files

<a href="not-a-real-link.pdf">This will alert in full check</a>

Suspiciously short blockquotes

<blockquote>This is probably not a blockquote</blockquote>

Not included in this demo: embedded audio, video and social media iframes, reminding users to provide text alternatives and test for keyboard and screen reader compatibility.


<div hidden><style>img {max-width: 320px; width: 50%;}</style><script src="https://code.jquery.com/jquery-3.5.1.min.js"></script><link rel="stylesheet" media="screen" href="{{ site.baseurl}}/css/editoria11y.css"><script src="{{ site.baseurl}}/demo/editoria11y-prefs.js"></script><script src="{{ site.baseurl}}/js/editoria11y.js"></script></div>