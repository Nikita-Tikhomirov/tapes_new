<style>
body {
	margin: 0;
	padding: 48px 10px;
}
	
	html {
		font-family: "Lato", sans-serif;
	}

	

.container {
	max-width: 1200px;
	margin: 0 auto;
}
</style>

<?php wp_head(); ?>

<div class="container">
	<h1><?php the_title(); ?></h1>
	<?php the_content(); ?>
<div class="container">
	
<?php wp_footer(); ?>