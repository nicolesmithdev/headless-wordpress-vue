<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'nicolesm_toningaftertwins' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Rk/@/q} Z~;yoF/ daCF.Z1t _]ZRs(IfdfJ@O[<WYiI7O_2`i,..M(]Ao;>Hu]F' );
define( 'SECURE_AUTH_KEY',  'm/cU JakJwipM.6TLUcLtJhxH/GV}1L}>}$rMfJdO]59j@)i !Q0B*>CRoAc3eEw' );
define( 'LOGGED_IN_KEY',    ')<aG4 1MdE]~/1jx=&_F2xcj6bzw_KoKFLe)UG%]k0l|E_$SW4*NM;Mf:C0~|0W#' );
define( 'NONCE_KEY',        '^Qh?(Gh*XSc|V.m*h:ROJ;v<`Y1IZT{O|F3umNJdm]DE}CvrOz8*hcdT/O1G(Ysr' );
define( 'AUTH_SALT',        '-](w?$!#wY)@A20X?tA2~QRL3b0ErCbeF$?{BOz*.x+x&mxwKY,U`SV$90A%d007' );
define( 'SECURE_AUTH_SALT', 'Cn9SC;D>QwBYS?f7}F?J<D,iQ~~mY0L9EiIl]_D&.n;j{hc:KNlr3[7b&~t)&; j' );
define( 'LOGGED_IN_SALT',   '?W@(ThagKjL)QJ]QL0:eZz=AxeD>V[5q0vbEo7D2V5[5MPnac8W:@[Gac2!*WAN!' );
define( 'NONCE_SALT',       'Wao<e5;&4Fh=B<]MoXveAP2PR2Uj_c_!zP 5{}jT2ylmfB)D>DomQ9]}Ynqiyh&)' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'awcj38u8o_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );
define( 'WP_ENVIRONMENT_TYPE', 'local' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
