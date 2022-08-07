<?php
$title  = !empty($attributes['title']) ? $attributes['title'] : '';
$images = !empty($attributes['images']) ? $attributes['images'] : array();
$is_custom = isset($attributes['isCustom']) ? $attributes['isCustom'] : false;

if (!$is_custom) {

    $default_values = rw_header_trust_logos(true);

    $title = $default_values['title'];
    $images = $default_values['logo_ids'];
}
?>

<section id="<?php echo wp_unique_id('trusted-logos-') ?>" class="main-banner mh-100 mw-100 pb-0 pb-lg-4 pt-xl-4 pt-0 pt-lg-0">
    <div class="container">

        <div class="row justify-content-center text-center row--bottom header-logos mb-4">

            <div class="col-md-12 mb-3">
                <div class="body-text">
                    <p><?php echo do_shortcode($title); ?></p>
                </div>
            </div>

            <?php if (!empty($images)) : ?>
                <?php foreach ($images as $image) : ?>
                    <div class="col-4 col-lg-auto">
                        <?php
                        $current_image = !$is_custom ? $image : $image['id'];

                        echo wp_get_attachment_image($current_image, 'medium', false, array('class' => 'img-fluid'));
                        ?>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>

        </div>
    </div>
</section>