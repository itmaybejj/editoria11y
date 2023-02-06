## Editoria11y Demo

* When an author is logged in to their site, Editoria11y places a small toggle button at the bottom right of each page with an issue count. Users can press the button to view details of any alerts or access additional tools, including visualizers for the document outline and image alt attributes, and the panel's state persists from page to page (open or shut).
* If the page has a *new* issue, a panel automatically slides open with more details.
* If the user minimizes the panel, it will not open automatically on future page visits until the content changes.

Since this page is demonstrating what an author would see if new issues were detected, the panel has popped open automatically, and tooltips will have appeared near detected issues with explanations of the issue and suggestions for improving the content.

<h4>Example issues:</h4>

* Example linked filename: [https://www.youtube.com/watch?v=DLzxrzFCyOs](https://www.youtube.com/watch?v=DLzxrzFCyOs)
* Example link only titled with generic text: “learn more,” “download,” “[click here](https://www.youtube.com/watch?v=DLzxrzFCyOs),” etc.
* Example (invisible) link with no accessible text at all: <a href="https://www.youtube.com/watch?v=DLzxrzFCyOs"></a>

<p>&bull; Example fake list.</p>
<p>&bull; Example image an unpronounceable text alternative: <img alt="'" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 120'%3E%3Crect width='240' height='120' fill='%23cccccc'%3E%3C/rect%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='26px' fill='%23333333'%3EImage%3C/text%3E%3C/svg%3E"></p>
<table>
<tr><td>An example table</td><td>With no headings</td></tr>
</table>

## Learn more

* [Test details and configuration notes](https://itmaybejj.github.io/editoria11y)
* [Editoria11y Drupal Module](https://www.drupal.org/project/editoria11y)
* [Editoria11y WordPress Plugin](https://github.com/itmaybejj/editoria11y-wp) (will be submitted to WordPress plugin library in early 2023)
* [Editoria11y SquareSpace Injector](https://github.com/itmaybejj/editoria11y-squarespace-inject) (Requires Commerce or Business tier)

<div hidden><style>
.wrapper {
  margin: auto;
  min-height: 100vh;
  }
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
    right: auto;
    top: auto;
    }
  body {
    padding: 0 2vw 0 1vw;
  }
  header {
    width: 90vw;
    max-width: 90vw;
    padding-right: 0;
    margin-top: 12px;
    margin-left: -1vw;
  }
  header li {
    max-width: 68vw;
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
            alertMode : 'assertive',
            showDismissed : true,
          });
        </script>
</div>
