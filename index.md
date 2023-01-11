## The missing spellcheck for accessibility
Editoria11y (editorial [ally](https://www.a11yproject.com/)) is a user-friendly accessibility checker that addresses three critical needs for content authors:

1. It runs automatically. Modern spellcheck works so well because it is always running; put spellcheck behind a button and few users remember to run it!
1. It focuses exclusively on straightforward issues a content author can easily understand and easily fix. Yes; comprehensive testing should be a key part of site creation, but if a tool is going to run automatically, it will do more harm than good if it is constantly alerting on code they do not understand and cannot fix.
1. It runs in context. Modern content management systems often assemble pages from many sources. Only the assembled page can be checked for things like the header outline order.

## The authoring experience
* When an author is logged in to their site, Editoria11y places a small toggle button at the bottom right of each page with an issue count. Users can press the button to view details of any alerts or access additional tools, including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If the page has a *new* issue, a panel automatically slides open with more details.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

Try examine the panel in the lower righthand corner of the page. Tooltips will have appeared near items with explanations of the issue and suggestions for improving the content:

* Example linked filename: [https://www.youtube.com/watch?v=DLzxrzFCyOs](https://www.youtube.com/watch?v=DLzxrzFCyOs)
* Example link only titled with generic text: “learn more,” “download,” “[click here](https://www.youtube.com/watch?v=DLzxrzFCyOs),” etc.
* Example (invisible) link with no accessible text at all: <a href="https://www.youtube.com/watch?v=DLzxrzFCyOs"></a>


### All Issues flagged
* Page outline and structure
  * Skipped heading levels
  * Empty headings
  * Very long headings
  * Suspiciously short blockquotes that may actually be headings
  * All-bold paragraphs with no punctuation that may actually be headings
  * EXCESSIVE USE OF CAPS LOCK FOR EMPHASIS
  * Tables without headers
  * Tables with empty header cells
  * Tables with document headers ("Header 3") instead of table headers 
  * Lists made from asterisks, numbers and letters rather than list elements
* Text alternatives for images &amp; media
  * Images with no alt attribute at all
  * Images with an empty alt attribute
  * Images with a filename as alt text
  * Images with very long alt text
  * Alt text that contains redundant text like "image of" or "photo of"
  * Video embeds, reminding the user to add closed captions
  * Audio embeds, reminding the user to provide a transcript
  * Social media embeds, reminding the user to provide alt text
  * Embedded visualizations that may require a text alternative
  * Links to PDFs and other documents, reminding the user to test the download for accessibility or provide an alternate, accessible format
* Meaningful links
  * Links with no text
  * Links titled with a filename
  * Links only titled with only generic text: "click here,” “learn more,” “download,” etc.
  * Links that open in a new window without an external link icon or some equivalent warning
  * Images in links with alt text that appears to be describing the image instead of the link destination

## Installation and configuration

If possible, start with a turnkey implementation:
* [Editoria11y Drupal Module](https://www.drupal.org/project/editoria11y)
* Editoria11y WordPress Plugin (coming soon) 

To make your own implementation, simply call your copy (or a CDN version) of "editoria11y.min.js" as a script, and then define a create a new "Ed11y" instance:

```html
  <script src="/PATH/TO/YOUR/COPY/editoria11y.min.js"></script>
  <script>
    const ed11y = new Ed11y({
      // options,
    });           
  </script>
 ```

A complete implementation will only be called for logged-in editors (you don't want your site visitors seeing your checker!) and will have set various [custom options](https://github.com/itmaybejj/editoria11y/blob/main/js/ed11y.js#L9). It might look more like this:

```html
  <script src="/PATH/TO/YOUR/COPY/editoria11y.min.js"></script>
  <script>
    const ed11y = new Ed11y({
      // We have two content regions
      checkRoots : 'main, .footer-content-zone',
            
      // Content editors cannot edit these elements
      ignoreElements : 'nav *, #social-block',
      
      // Don't scan while our editor toolbar is open
      doNotRun : ".editor-toolbar",

    });
  </script>
 ```


## Contact
Editoria11y is maintained by [John Jameson](https://www.linkedin.com/in/johnwjameson/), and is provided to the community thanks to the accessibility initiatives at Princeton University's [Office of Web Development Services](https://wds.princeton.edu/)
* [Repository](https://github.com/itmaybejj/editoria11y)
* [Issue queue](https://github.com/itmaybejj/editoria11y/issues)


<div hidden><style>
.wrapper {float:left;}
a {font-weight: 500;}
a.github {
  display: inline-block;
  height: auto;
  padding: 12px 2px 12px 32px;
}
header li {
  width: 11rem;
  height: auto;
}
body {
  font-size: 16px;
}
header {
  width: auto;
  max-width: 192px;
}
@media print, screen and (max-width: 960px) {
  header ul {
    position: relative;
  }
  header {
    width: 90vw;
    padding-right: 0;
  }
  div.wrapper {
    width: 100%;
  }
}

</style>
 <script src="{{ site.baseurl}}/dist/editoria11y.min.js"></script>
        <!-- Instantiate-->
        <script>
          const ed11y = new Ed11y({
            // Should we be polite?
            alertMode : 'assertive',
          });
        </script>
</div>
