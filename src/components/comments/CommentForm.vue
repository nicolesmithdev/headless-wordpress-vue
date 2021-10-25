<template>
    <div id="respond" class="comment-reply-title">
        <h3 id="reply-title" class="comment-reply-title">Leave a Reply</h3>
        <form id="commentform" class="comment-form" action="#" method="post">
            <p class="comment-notes">
                <span id="email-notes"
                    >Your email address will not be published.</span
                >
                Required fields are marked <span class="required">*</span>
            </p>
            <p class="comment-form-comment">
                <label for="comment">Comment</label>
                <textarea
                    id="comment"
                    name="comment"
                    cols="45"
                    rows="8"
                    maxlength="65525"
                    required="required"
                ></textarea>
            </p>
            <p class="comment-form-author">
                <label for="author">Name <span class="required">*</span></label>
                <input
                    id="author"
                    name="author"
                    type="text"
                    value=""
                    size="30"
                    maxlength="245"
                    required="required"
                />
            </p>
            <p class="comment-form-email">
                <label for="email">Email <span class="required">*</span></label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value=""
                    size="30"
                    maxlength="100"
                    aria-describedby="email-notes"
                    required="required"
                />
            </p>
            <p class="comment-form-url">
                <label for="url">Website</label>
                <input
                    id="url"
                    name="url"
                    type="url"
                    value=""
                    size="30"
                    maxlength="200"
                />
            </p>
            <p class="comment-form-comment-subscribe">
                <label for="cren_subscribe_to_comment"
                    ><input
                        id="cren_subscribe_to_comment"
                        name="cren_subscribe_to_comment"
                        type="checkbox"
                        value="on"
                    />Notify me via e-mail if anyone answers my comment.</label
                >
            </p>
            <p class="wpgdprc-checkbox">
                <input
                    type="checkbox"
                    name="wpgdprc"
                    id="wpgdprc"
                    value="1"
                /><label for="wpgdprc"
                    >By using this form you agree with the storage and handling
                    of your data by this website.
                    <abbr
                        class="wpgdprc-required"
                        title="You need to accept this checkbox."
                        >*</abbr
                    ></label
                >
            </p>
            <p class="form-submit">
                <input
                    name="submit"
                    type="submit"
                    id="submit"
                    class="submit"
                    value="Post Comment"
                />
                <input
                    type="hidden"
                    name="comment_post_ID"
                    value="2010"
                    id="comment_post_ID"
                />
                <input
                    type="hidden"
                    name="comment_parent"
                    id="comment_parent"
                    value="0"
                />
            </p>
            <p style="display: none;">
                <input
                    type="hidden"
                    id="akismet_comment_nonce"
                    name="akismet_comment_nonce"
                    value="e4be01a1da"
                />
            </p>
            <p style="display: none !important;">
                <label
                    >Δ<textarea
                        name="ak_hp_textarea"
                        cols="45"
                        rows="8"
                        maxlength="100"
                    ></textarea></label
                ><input
                    type="hidden"
                    id="ak_js"
                    name="ak_js"
                    value="1634924532526"
                />
                <!-- <script>
                    document
                        .getElementById('ak_js')
                        .setAttribute('value', new Date().getTime());
                </script> -->
            </p>
        </form>
    </div>
</template>
