<section class="main-banner mh-100 mw-100 pb-0 pb-lg-4 pt-xl-4 pt-0 pt-lg-0">
    <div class="container">

        <div class="row justify-content-center text-center row--bottom header-logos mb-4">

            <div class="col-md-12 mb-3">
                <div class="body-text">
                    <p><?php echo do_shortcode($attributes['title']); ?></p>
                </div>
            </div>

            <?php if (!empty($attributes['images'])) : ?>
                <?php foreach ($attributes['images'] as $image) : ?>
                    <div class="col-4 col-lg-auto">
                        <?php echo wp_get_attachment_image($image['id'], 'medium', false, array('class' => 'img-fluid')); ?>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

        </div>
    </div>
</section>