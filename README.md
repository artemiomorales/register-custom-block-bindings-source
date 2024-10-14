# Register Custom Block Bindings Source

This is a test repository for testing Block Bindings feature in WordPress, including its API and UI.

# Example Usage
```
<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"my-plugin/user-data","args":{"key":"name","userSlug":"admin"}}}}} -->
<p>Name</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"my-plugin/user-data","args":{"key":"description","userSlug":"admin"}}}}} -->
<p>Description</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"my-plugin/user-data","args":{"key":"url","userSlug":"admin"}}}}} -->
<p>URL</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"metadata":{"bindings":{"content":{"source":"my-plugin/user-data","args":{"key":"nickname","userSlug":"admin"}}}}} -->
<p>nickname</p>
<!-- /wp:paragraph -->
```