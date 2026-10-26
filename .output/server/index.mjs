globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-10-24T17:15:19.807Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/auth-djBR4qON.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cf-onhLhi+3BpChfbpWgy/glCPTrSI\"",
		"mtime": "2026-10-26T11:08:07.497Z",
		"size": 463,
		"path": "../public/assets/auth-djBR4qON.js"
	},
	"/assets/jsx-runtime-Dk72oS4N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2246-jdmifwUklrWzVvkkm/k29uuTwFE\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 8774,
		"path": "../public/assets/jsx-runtime-Dk72oS4N.js"
	},
	"/assets/register-C5YmgVlA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ca4-vzL55j/nCFVhtY6UVUsrlbhVA1w\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 3236,
		"path": "../public/assets/register-C5YmgVlA.js"
	},
	"/assets/login-D7T6eB40.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c47-sSiQu4ICSo9S4VvE/tKQ7nGmV4I\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 3143,
		"path": "../public/assets/login-D7T6eB40.js"
	},
	"/assets/link-DCq_ycTY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c07-RsmqzJ5CDMOkE43qMWKpW1ykKHE\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 11271,
		"path": "../public/assets/link-DCq_ycTY.js"
	},
	"/assets/admin-DxEcd83z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"36c4-FIzBRaeIiKiCXxZMrfEPvHpp5Dk\"",
		"mtime": "2026-10-26T11:08:07.497Z",
		"size": 14020,
		"path": "../public/assets/admin-DxEcd83z.js"
	},
	"/assets/routes-BM4x6FeU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"394-DDY4krJnkW7IzkfgAnzNXyK9Dio\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 916,
		"path": "../public/assets/routes-BM4x6FeU.js"
	},
	"/assets/shop-COe4IMF9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e1d-Ty3ypcK4qnqAZE8MZstGkz8TYcc\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 36381,
		"path": "../public/assets/shop-COe4IMF9.js"
	},
	"/assets/user-CFxq-ss5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9ba-Igik4KMDrWUAW9FWeUJ9gl+pTEQ\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 2490,
		"path": "../public/assets/user-CFxq-ss5.js"
	},
	"/assets/styles-DmJv-kXC.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"13b29-TMohqkFQfRno0YwQYW1KDQDa8w8\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 80681,
		"path": "../public/assets/styles-DmJv-kXC.css"
	},
	"/images/apple.png": {
		"type": "image/png",
		"etag": "\"3466-SRdBao7Vj+95Si0UzNmezdV5Ajs\"",
		"mtime": "2026-10-24T17:15:19.827Z",
		"size": 13414,
		"path": "../public/images/apple.png"
	},
	"/images/applejuice.png": {
		"type": "image/png",
		"etag": "\"2bde-las383LbbNNfJIR+5wwTrkSz5D4\"",
		"mtime": "2026-10-24T17:15:19.831Z",
		"size": 11230,
		"path": "../public/images/applejuice.png"
	},
	"/images/banana.png": {
		"type": "image/png",
		"etag": "\"2a83-RRm0A1onFhnqsuG/+Dhr1oaSZ/M\"",
		"mtime": "2026-10-24T17:15:19.831Z",
		"size": 10883,
		"path": "../public/images/banana.png"
	},
	"/assets/index--_R7dUZc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"55a38-l/6JMsK1Y++QhPvLJU1xE8R36YY\"",
		"mtime": "2026-10-26T11:08:07.497Z",
		"size": 350776,
		"path": "../public/assets/index--_R7dUZc.js"
	},
	"/images/blacktea.png": {
		"type": "image/png",
		"etag": "\"43c8-k4v2Bhu7jixXf/rHcgl9ExVLC6w\"",
		"mtime": "2026-10-24T17:15:19.845Z",
		"size": 17352,
		"path": "../public/images/blacktea.png"
	},
	"/assets/useNavigate-C2Dtm6-y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fe-DFnruAolk0zefkCqXh6Pq/6vPqQ\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 254,
		"path": "../public/assets/useNavigate-C2Dtm6-y.js"
	},
	"/images/bread.png": {
		"type": "image/png",
		"etag": "\"3d4d-LYaaOa8jm2TrCnNy6WvFNw7GdG8\"",
		"mtime": "2026-10-24T17:15:19.861Z",
		"size": 15693,
		"path": "../public/images/bread.png"
	},
	"/images/brinjal.png": {
		"type": "image/png",
		"etag": "\"3b9b-9jNe/rXLHyQpBWuYiQ4GaMQdKcE\"",
		"mtime": "2026-10-24T17:15:19.861Z",
		"size": 15259,
		"path": "../public/images/brinjal.png"
	},
	"/images/brownbread.png": {
		"type": "image/png",
		"etag": "\"3e52-uzlz75/MgEoAkN0rh2AP3SdNpqU\"",
		"mtime": "2026-10-24T17:15:19.877Z",
		"size": 15954,
		"path": "../public/images/brownbread.png"
	},
	"/images/butter.png": {
		"type": "image/png",
		"etag": "\"4762-QnlovwyeCmPWN2PVUcPspHHOaRs\"",
		"mtime": "2026-10-24T17:15:19.893Z",
		"size": 18274,
		"path": "../public/images/butter.png"
	},
	"/images/biscuits.png": {
		"type": "image/png",
		"etag": "\"3ac5-CheiiHnao8SpnirtQDgUSI66VOo\"",
		"mtime": "2026-10-24T17:15:19.845Z",
		"size": 15045,
		"path": "../public/images/biscuits.png"
	},
	"/images/buns.png": {
		"type": "image/png",
		"etag": "\"56a3-dRkpNDFBGdVD28zu0Wsdh2AgNqs\"",
		"mtime": "2026-10-24T17:15:19.893Z",
		"size": 22179,
		"path": "../public/images/buns.png"
	},
	"/images/broom.png": {
		"type": "image/png",
		"etag": "\"2953-rNW5gT6CEM44lRa3Kw8MhsAKJ+4\"",
		"mtime": "2026-10-24T17:15:19.877Z",
		"size": 10579,
		"path": "../public/images/broom.png"
	},
	"/assets/supabase-C5SIlLdi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3499d-pgekfSO76z+n9XLcP9/7DKJoINQ\"",
		"mtime": "2026-10-26T11:08:07.531Z",
		"size": 215453,
		"path": "../public/assets/supabase-C5SIlLdi.js"
	},
	"/images/cabbage.png": {
		"type": "image/png",
		"etag": "\"6a1e-j2iJ16VYqk9IlgEpnnetYIXD2wE\"",
		"mtime": "2026-10-24T17:15:19.909Z",
		"size": 27166,
		"path": "../public/images/cabbage.png"
	},
	"/images/cake.png": {
		"type": "image/png",
		"etag": "\"4f2f-T9iS7rMxV9OGftbXp5MgXFNu4/Y\"",
		"mtime": "2026-10-24T17:15:19.909Z",
		"size": 20271,
		"path": "../public/images/cake.png"
	},
	"/images/capsicum.png": {
		"type": "image/png",
		"etag": "\"5e1e-ZUaMVyOglb5yG5xVIZObvMzQwd8\"",
		"mtime": "2026-10-24T17:15:19.924Z",
		"size": 24094,
		"path": "../public/images/capsicum.png"
	},
	"/images/cauliflower.png": {
		"type": "image/png",
		"etag": "\"7583-HdUbm8vNRsfAxo/c9hHHUfJsVdk\"",
		"mtime": "2026-10-24T17:15:19.940Z",
		"size": 30083,
		"path": "../public/images/cauliflower.png"
	},
	"/images/cheese.png": {
		"type": "image/png",
		"etag": "\"3afd-efsYKvIMYO+EQQOPd05aQL+6PZs\"",
		"mtime": "2026-10-24T17:15:19.940Z",
		"size": 15101,
		"path": "../public/images/cheese.png"
	},
	"/images/carrot.png": {
		"type": "image/png",
		"etag": "\"56d0-Dq6f23ohV2usNvQmhDmOG3l0n8U\"",
		"mtime": "2026-10-24T17:15:19.924Z",
		"size": 22224,
		"path": "../public/images/carrot.png"
	},
	"/images/chocolate.png": {
		"type": "image/png",
		"etag": "\"41d9-5VOKA4/z8Xf5H1vDLwljrYDEIqU\"",
		"mtime": "2026-10-24T17:15:19.956Z",
		"size": 16857,
		"path": "../public/images/chocolate.png"
	},
	"/images/coffee.png": {
		"type": "image/png",
		"etag": "\"2155-bG02mxJXXqVLUi2IEG+VSObILMQ\"",
		"mtime": "2026-10-24T17:15:19.972Z",
		"size": 8533,
		"path": "../public/images/coffee.png"
	},
	"/images/cookies.png": {
		"type": "image/png",
		"etag": "\"3aa4-nytSVbF/F7zsIm0qQBg/CC92058\"",
		"mtime": "2026-10-24T17:15:19.988Z",
		"size": 15012,
		"path": "../public/images/cookies.png"
	},
	"/images/cornflakes.png": {
		"type": "image/png",
		"etag": "\"6e6a-IwV0Q8WB0L5A2U6z1CyYQxMSjws\"",
		"mtime": "2026-10-24T17:15:19.988Z",
		"size": 28266,
		"path": "../public/images/cornflakes.png"
	},
	"/images/chips.png": {
		"type": "image/png",
		"etag": "\"56f5-8sqjzBX76ZJbRzC9mXh8YNe95GE\"",
		"mtime": "2026-10-24T17:15:19.956Z",
		"size": 22261,
		"path": "../public/images/chips.png"
	},
	"/images/cream.png": {
		"type": "image/png",
		"etag": "\"4cfc-8HTN1wqCCZ8wXyyzRZWTD33b1Z4\"",
		"mtime": "2026-10-24T17:15:20.004Z",
		"size": 19708,
		"path": "../public/images/cream.png"
	},
	"/images/cupcake.png": {
		"type": "image/png",
		"etag": "\"5f99-6Nzh4f/UrB/fq4879Bo/4LgP+Lo\"",
		"mtime": "2026-10-24T17:15:20.020Z",
		"size": 24473,
		"path": "../public/images/cupcake.png"
	},
	"/images/croissant.png": {
		"type": "image/png",
		"etag": "\"67e5-0iszQcgcrIKTKQgZqfRm90yU0mg\"",
		"mtime": "2026-10-24T17:15:20.004Z",
		"size": 26597,
		"path": "../public/images/croissant.png"
	},
	"/images/curd.png": {
		"type": "image/png",
		"etag": "\"4c13-oc+fODOVF6L7z+ASdEYhnr7Hors\"",
		"mtime": "2026-10-24T17:15:20.036Z",
		"size": 19475,
		"path": "../public/images/curd.png"
	},
	"/images/deo.png": {
		"type": "image/png",
		"etag": "\"6abe-Zzd72dgqwpzoUcQGpGn1twLsJO0\"",
		"mtime": "2026-10-24T17:15:20.036Z",
		"size": 27326,
		"path": "../public/images/deo.png"
	},
	"/images/dishwash.png": {
		"type": "image/png",
		"etag": "\"31bd-7uY83MVMfAgb0f2AXiJITPPOV3I\"",
		"mtime": "2026-10-24T17:15:20.067Z",
		"size": 12733,
		"path": "../public/images/dishwash.png"
	},
	"/images/detergent.png": {
		"type": "image/png",
		"etag": "\"31c9-IeqtVnfgySDBkWvjh4JTp69rbPg\"",
		"mtime": "2026-10-24T17:15:20.051Z",
		"size": 12745,
		"path": "../public/images/detergent.png"
	},
	"/images/donut.png": {
		"type": "image/png",
		"etag": "\"574f-KHM+piGr2FQOYmVDOqfBFZ0bIxA\"",
		"mtime": "2026-10-24T17:15:20.067Z",
		"size": 22351,
		"path": "../public/images/donut.png"
	},
	"/images/energybar.png": {
		"type": "image/png",
		"etag": "\"672c-igFI9Y8Ly8axiuptWiv+VBpCLu8\"",
		"mtime": "2026-10-24T17:15:20.083Z",
		"size": 26412,
		"path": "../public/images/energybar.png"
	},
	"/images/floorcleaner.png": {
		"type": "image/png",
		"etag": "\"2d48-0lEXBI+Z05uEpEUJ9pcqHbf/gDQ\"",
		"mtime": "2026-10-24T17:15:20.099Z",
		"size": 11592,
		"path": "../public/images/floorcleaner.png"
	},
	"/images/facewash.png": {
		"type": "image/png",
		"etag": "\"31cd-IOxn2wBetiyym/acd/2hHrQ+8b4\"",
		"mtime": "2026-10-24T17:15:20.099Z",
		"size": 12749,
		"path": "../public/images/facewash.png"
	},
	"/images/energydrink.png": {
		"type": "image/png",
		"etag": "\"284e-ADTMbmkxd/aQVc9QhhoJ70dVc14\"",
		"mtime": "2026-10-24T17:15:20.083Z",
		"size": 10318,
		"path": "../public/images/energydrink.png"
	},
	"/images/freshener.png": {
		"type": "image/png",
		"etag": "\"1e2b-aKojTyvM3FMGtCKaWLOrcwwCifM\"",
		"mtime": "2026-10-24T17:15:20.115Z",
		"size": 7723,
		"path": "../public/images/freshener.png"
	},
	"/images/garbage.png": {
		"type": "image/png",
		"etag": "\"58e4-lIesos6UfbNDdp19jv4kuas3zTM\"",
		"mtime": "2026-10-24T17:15:20.115Z",
		"size": 22756,
		"path": "../public/images/garbage.png"
	},
	"/images/garlicbread.png": {
		"type": "image/png",
		"etag": "\"2eda-Yyyh9N2xb69WcDtPep4WE98EwJk\"",
		"mtime": "2026-10-24T17:15:20.131Z",
		"size": 11994,
		"path": "../public/images/garlicbread.png"
	},
	"/images/ghee.png": {
		"type": "image/png",
		"etag": "\"6fe1-RlDTD5idquieLxqMl0aLZOgI64I\"",
		"mtime": "2026-10-24T17:15:20.131Z",
		"size": 28641,
		"path": "../public/images/ghee.png"
	},
	"/images/glasscleaner.png": {
		"type": "image/png",
		"etag": "\"2c96-bcPOAmXgVvuBvF0gyX5dNd+mHDg\"",
		"mtime": "2026-10-24T17:15:20.147Z",
		"size": 11414,
		"path": "../public/images/glasscleaner.png"
	},
	"/images/grapes.png": {
		"type": "image/png",
		"etag": "\"2deb-To1a1fM8E0Gg0rzddsLWHkcHEAM\"",
		"mtime": "2026-10-24T17:15:20.147Z",
		"size": 11755,
		"path": "../public/images/grapes.png"
	},
	"/images/greentea.png": {
		"type": "image/png",
		"etag": "\"605b-bLbxqZPYwuB5lG5vKfwOXBq83R4\"",
		"mtime": "2026-10-24T17:15:20.163Z",
		"size": 24667,
		"path": "../public/images/greentea.png"
	},
	"/images/hairoil.png": {
		"type": "image/png",
		"etag": "\"57b0-NuHIdC5HZhjg+eh6ZNQdDR51P2M\"",
		"mtime": "2026-10-24T17:15:20.178Z",
		"size": 22448,
		"path": "../public/images/hairoil.png"
	},
	"/images/handwash.png": {
		"type": "image/png",
		"etag": "\"47b8-ZT6vBxYfYSrIAsErlEp+P9vfSnU\"",
		"mtime": "2026-10-24T17:15:20.178Z",
		"size": 18360,
		"path": "../public/images/handwash.png"
	},
	"/images/guava.png": {
		"type": "image/png",
		"etag": "\"3fd6-BokR6lQcmXn9I1zz6YlDLf00pto\"",
		"mtime": "2026-10-24T17:15:20.163Z",
		"size": 16342,
		"path": "../public/images/guava.png"
	},
	"/images/khakhra.png": {
		"type": "image/png",
		"etag": "\"69d0-bk6iZ3Ke7YCwBMd6FYOZHGnaiBA\"",
		"mtime": "2026-10-24T17:15:20.194Z",
		"size": 27088,
		"path": "../public/images/khakhra.png"
	},
	"/images/icedtea.png": {
		"type": "image/png",
		"etag": "\"45ac-Ie0CorQQ0Pr7Z3Od0fDOJVjUOBA\"",
		"mtime": "2026-10-24T17:15:20.194Z",
		"size": 17836,
		"path": "../public/images/icedtea.png"
	},
	"/images/lassi.png": {
		"type": "image/png",
		"etag": "\"30b4-+3rhhCzVEGG0FDA9jBqPGqwKPAc\"",
		"mtime": "2026-10-24T17:15:20.210Z",
		"size": 12468,
		"path": "../public/images/lassi.png"
	},
	"/images/lotion.png": {
		"type": "image/png",
		"etag": "\"2e51-b3Esz9LBI0CZyRjNwK/2i3N8VXU\"",
		"mtime": "2026-10-24T17:15:20.226Z",
		"size": 11857,
		"path": "../public/images/lotion.png"
	},
	"/images/khichdi.png": {
		"type": "image/png",
		"etag": "\"2c48-hBJmaPwizes5F7feD5K0PVITB5M\"",
		"mtime": "2026-10-24T17:15:20.210Z",
		"size": 11336,
		"path": "../public/images/khichdi.png"
	},
	"/images/lemonjuice.png": {
		"type": "image/png",
		"etag": "\"696f-BvtlzW9lGsfwMMwhRc8J8U/w9+0\"",
		"mtime": "2026-10-24T17:15:20.226Z",
		"size": 26991,
		"path": "../public/images/lemonjuice.png"
	},
	"/images/mango.png": {
		"type": "image/png",
		"etag": "\"21ee-A/bl/+KBKbsYiSwK16O6tYeor/c\"",
		"mtime": "2026-10-24T17:15:20.242Z",
		"size": 8686,
		"path": "../public/images/mango.png"
	},
	"/images/milk.png": {
		"type": "image/png",
		"etag": "\"2c59-tw3gQbatFteQ1m8O0efy/1lizBQ\"",
		"mtime": "2026-10-24T17:15:20.258Z",
		"size": 11353,
		"path": "../public/images/milk.png"
	},
	"/images/milkshake.png": {
		"type": "image/png",
		"etag": "\"31e8-G5wLxQJRSmybt0K79h/47vN6kAM\"",
		"mtime": "2026-10-24T17:15:20.274Z",
		"size": 12776,
		"path": "../public/images/milkshake.png"
	},
	"/images/macaroni.png": {
		"type": "image/png",
		"etag": "\"81b2-u4Rz074L9JVKeV7aO1ORz/3j4k8\"",
		"mtime": "2026-10-24T17:15:20.242Z",
		"size": 33202,
		"path": "../public/images/macaroni.png"
	},
	"/images/mangojuice.png": {
		"type": "image/png",
		"etag": "\"2812-GiW4SjVoe8ZERTbTTAEkr2TRb2M\"",
		"mtime": "2026-10-24T17:15:20.258Z",
		"size": 10258,
		"path": "../public/images/mangojuice.png"
	},
	"/images/mixture.png": {
		"type": "image/png",
		"etag": "\"639c-H6Kxm6177ACkZmq+JFCwe5DLdLw\"",
		"mtime": "2026-10-24T17:15:20.274Z",
		"size": 25500,
		"path": "../public/images/mixture.png"
	},
	"/images/multigrain.png": {
		"type": "image/png",
		"etag": "\"455a-o/1f57ZmRSDMm2b0o3tTtMIdjcU\"",
		"mtime": "2026-10-24T17:15:20.305Z",
		"size": 17754,
		"path": "../public/images/multigrain.png"
	},
	"/images/mop.png": {
		"type": "image/png",
		"etag": "\"5894-a8Jk61fHd+pi9AmtH2DGk5ffOm0\"",
		"mtime": "2026-10-24T17:15:20.289Z",
		"size": 22676,
		"path": "../public/images/mop.png"
	},
	"/images/nachos.png": {
		"type": "image/png",
		"etag": "\"5d2b-95TSPPx0ZcLqWaGpV8GlaAxmw24\"",
		"mtime": "2026-10-24T17:15:20.305Z",
		"size": 23851,
		"path": "../public/images/nachos.png"
	},
	"/images/muesli.png": {
		"type": "image/png",
		"etag": "\"8954-MF8c9FljiIwVrf5d6WZrF1AtqTk\"",
		"mtime": "2026-10-24T17:15:20.289Z",
		"size": 35156,
		"path": "../public/images/muesli.png"
	},
	"/images/namkeen.png": {
		"type": "image/png",
		"etag": "\"67e1-dJy8tNosqnq7MCp7LWYhoYmveFU\"",
		"mtime": "2026-10-24T17:15:20.321Z",
		"size": 26593,
		"path": "../public/images/namkeen.png"
	},
	"/images/noodles.png": {
		"type": "image/png",
		"etag": "\"71fa-Jinf1ihXYw0QQlxo2MvU+aQuhSw\"",
		"mtime": "2026-10-24T17:15:20.321Z",
		"size": 29178,
		"path": "../public/images/noodles.png"
	},
	"/images/oats.png": {
		"type": "image/png",
		"etag": "\"a1fd-jDtDIKjIZaFdXz+hZW9/4bTo7J0\"",
		"mtime": "2026-10-24T17:15:20.337Z",
		"size": 41469,
		"path": "../public/images/oats.png"
	},
	"/images/onion.png": {
		"type": "image/png",
		"etag": "\"541b-Z9T1aCTJlmccze8sO1T+OHX0p3g\"",
		"mtime": "2026-10-24T17:15:20.337Z",
		"size": 21531,
		"path": "../public/images/onion.png"
	},
	"/images/pancake.png": {
		"type": "image/png",
		"etag": "\"4d4d-9bm6zvTKCZMJUj98TEfF5m+qkIk\"",
		"mtime": "2026-10-24T17:15:20.353Z",
		"size": 19789,
		"path": "../public/images/pancake.png"
	},
	"/images/orange.png": {
		"type": "image/png",
		"etag": "\"4a62-W8Q2T96DH5/9GF+tfUDlw5tOEEA\"",
		"mtime": "2026-10-24T17:15:20.353Z",
		"size": 19042,
		"path": "../public/images/orange.png"
	},
	"/images/paneer.png": {
		"type": "image/png",
		"etag": "\"4bb0-DppG4PWIochVJIKxjvF80OJjPac\"",
		"mtime": "2026-10-24T17:15:20.353Z",
		"size": 19376,
		"path": "../public/images/paneer.png"
	},
	"/images/pasta.png": {
		"type": "image/png",
		"etag": "\"9995-TnsCpbncOdqMr7TkZXprRBEdeLc\"",
		"mtime": "2026-10-24T17:15:20.369Z",
		"size": 39317,
		"path": "../public/images/pasta.png"
	},
	"/images/pastakit.png": {
		"type": "image/png",
		"etag": "\"7323-6lQvaCt8rhGsdqQiduaKY7szrYY\"",
		"mtime": "2026-10-24T17:15:20.385Z",
		"size": 29475,
		"path": "../public/images/pastakit.png"
	},
	"/images/papaya.png": {
		"type": "image/png",
		"etag": "\"42a1-Fzlu4ynHbiE7vKVEUNiPzEv5L5M\"",
		"mtime": "2026-10-24T17:15:20.369Z",
		"size": 17057,
		"path": "../public/images/papaya.png"
	},
	"/images/pav.png": {
		"type": "image/png",
		"etag": "\"6830-ssKHIqL/mCH/4lSfr5MGtTrLg64\"",
		"mtime": "2026-10-24T17:15:20.385Z",
		"size": 26672,
		"path": "../public/images/pav.png"
	},
	"/images/phenyl.png": {
		"type": "image/png",
		"etag": "\"2910-gMHeLjlFq5s8X6V875nW8CDPMHU\"",
		"mtime": "2026-10-24T17:15:20.401Z",
		"size": 10512,
		"path": "../public/images/phenyl.png"
	},
	"/images/pizzabase.png": {
		"type": "image/png",
		"etag": "\"6fb8-rrm25PiTVfMhcYRwZPsx5ZP1m2g\"",
		"mtime": "2026-10-24T17:15:20.416Z",
		"size": 28600,
		"path": "../public/images/pizzabase.png"
	},
	"/images/peanutbar.png": {
		"type": "image/png",
		"etag": "\"67e8-yq5cnhUQMglfrV/NCRWw1zAfdTk\"",
		"mtime": "2026-10-24T17:15:20.385Z",
		"size": 26600,
		"path": "../public/images/peanutbar.png"
	},
	"/images/potato.png": {
		"type": "image/png",
		"etag": "\"53b9-PNfxjPk3k3PFmHMXc/Q14dhGhLg\"",
		"mtime": "2026-10-24T17:15:20.448Z",
		"size": 21433,
		"path": "../public/images/potato.png"
	},
	"/images/poha.png": {
		"type": "image/png",
		"etag": "\"9877-oURZX7FmgGEZGYbjmFGbZVsesMk\"",
		"mtime": "2026-10-24T17:15:20.432Z",
		"size": 39031,
		"path": "../public/images/poha.png"
	},
	"/images/peas.png": {
		"type": "image/png",
		"etag": "\"45d6-RodbCbhuqn1aimi8/By6PxG4hQo\"",
		"mtime": "2026-10-24T17:15:20.401Z",
		"size": 17878,
		"path": "../public/images/peas.png"
	},
	"/images/popcorn.png": {
		"type": "image/png",
		"etag": "\"4aa4-I5XxqXPTvxKVr51f1zPfHJe33FM\"",
		"mtime": "2026-10-24T17:15:20.432Z",
		"size": 19108,
		"path": "../public/images/popcorn.png"
	},
	"/images/razor.png": {
		"type": "image/png",
		"etag": "\"376c-UzyNUfVazNHvciXFnnLeLyJZmdM\"",
		"mtime": "2026-10-24T17:15:20.448Z",
		"size": 14188,
		"path": "../public/images/razor.png"
	},
	"/images/rusk.png": {
		"type": "image/png",
		"etag": "\"5452-kNMi/Axq75RyA4pWeas0NNw0j3c\"",
		"mtime": "2026-10-24T17:15:20.464Z",
		"size": 21586,
		"path": "../public/images/rusk.png"
	},
	"/images/pineapple.png": {
		"type": "image/png",
		"etag": "\"4f4f-BkBZGJJTVKPEfhhO/p0+OkOvJBU\"",
		"mtime": "2026-10-24T17:15:20.416Z",
		"size": 20303,
		"path": "../public/images/pineapple.png"
	},
	"/images/pomegranate.png": {
		"type": "image/png",
		"etag": "\"6904-PmxsLShHvfzBOm14yEsJZ/LIIGg\"",
		"mtime": "2026-10-24T17:15:20.432Z",
		"size": 26884,
		"path": "../public/images/pomegranate.png"
	},
	"/images/sanitizer.png": {
		"type": "image/png",
		"etag": "\"1ede-asiO1TRuH+KUKph4wVGM1kJuyoo\"",
		"mtime": "2026-10-24T17:15:20.464Z",
		"size": 7902,
		"path": "../public/images/sanitizer.png"
	},
	"/images/shampoo.png": {
		"type": "image/png",
		"etag": "\"2918-DotYE4Saq+Jutx9kSEhzpYEl9Fg\"",
		"mtime": "2026-10-24T17:15:20.496Z",
		"size": 10520,
		"path": "../public/images/shampoo.png"
	},
	"/images/scrub.png": {
		"type": "image/png",
		"etag": "\"603a-ej8v6Wsc1Jcw6LxEIfQIHoL1tCs\"",
		"mtime": "2026-10-24T17:15:20.480Z",
		"size": 24634,
		"path": "../public/images/scrub.png"
	},
	"/images/sev.png": {
		"type": "image/png",
		"etag": "\"523f-nLfOQeXo6Y4AThBckmtXeUfI614\"",
		"mtime": "2026-10-24T17:15:20.480Z",
		"size": 21055,
		"path": "../public/images/sev.png"
	},
	"/images/soap.png": {
		"type": "image/png",
		"etag": "\"4b11-QG9gm6yCepSKERKaroltSkUhtdg\"",
		"mtime": "2026-10-24T17:15:20.496Z",
		"size": 19217,
		"path": "../public/images/soap.png"
	},
	"/images/soup.png": {
		"type": "image/png",
		"etag": "\"4b8f-Wv6iywcEFLlrPA6PV562je9RYUY\"",
		"mtime": "2026-10-24T17:15:20.527Z",
		"size": 19343,
		"path": "../public/images/soup.png"
	},
	"/images/spinach.png": {
		"type": "image/png",
		"etag": "\"4f44-sCDpadLEEqYvESAbYA/RVJ7rXL4\"",
		"mtime": "2026-10-24T17:15:20.543Z",
		"size": 20292,
		"path": "../public/images/spinach.png"
	},
	"/images/toiletcleaner.png": {
		"type": "image/png",
		"etag": "\"4eba-Eb3EkPovsPQ9NUH23cWFoYNQ2I4\"",
		"mtime": "2026-10-24T17:15:20.591Z",
		"size": 20154,
		"path": "../public/images/toiletcleaner.png"
	},
	"/images/soda.png": {
		"type": "image/png",
		"etag": "\"1e67-PsEyelRC9PgS5lw4EDdkEwKMtvg\"",
		"mtime": "2026-10-24T17:15:20.511Z",
		"size": 7783,
		"path": "../public/images/soda.png"
	},
	"/images/softdrink.png": {
		"type": "image/png",
		"etag": "\"23d4-s2ne6CIUH3wnf05b1DLb/DBN8PY\"",
		"mtime": "2026-10-24T17:15:20.511Z",
		"size": 9172,
		"path": "../public/images/softdrink.png"
	},
	"/images/tomato.png": {
		"type": "image/png",
		"etag": "\"414d-/ZUtm8XKK5xnPB/wZODPNSdpv1A\"",
		"mtime": "2026-10-24T17:15:20.607Z",
		"size": 16717,
		"path": "../public/images/tomato.png"
	},
	"/images/toothpaste.png": {
		"type": "image/png",
		"etag": "\"3ebb-chfEBLNp7kfrj/545ZCwtaZa7B0\"",
		"mtime": "2026-10-24T17:15:20.623Z",
		"size": 16059,
		"path": "../public/images/toothpaste.png"
	},
	"/images/toothbrush.png": {
		"type": "image/png",
		"etag": "\"426f-DQmsyp5aZ+9X3yN1X87z+qZXVQ4\"",
		"mtime": "2026-10-24T17:15:20.607Z",
		"size": 17007,
		"path": "../public/images/toothbrush.png"
	},
	"/images/upma.png": {
		"type": "image/png",
		"etag": "\"82c6-YtiQlz9cFch/8WSy3rWC3lG6Kko\"",
		"mtime": "2026-10-24T17:15:20.639Z",
		"size": 33478,
		"path": "../public/images/upma.png"
	},
	"/images/tissue.png": {
		"type": "image/png",
		"etag": "\"3ae4-4VDOZ8xC/MlNaLvGUCaGTtUW5rs\"",
		"mtime": "2026-10-24T17:15:20.575Z",
		"size": 15076,
		"path": "../public/images/tissue.png"
	},
	"/images/watermelon.png": {
		"type": "image/png",
		"etag": "\"6e2d-CnBsS+42I34TVcfo5UN2cFqzn34\"",
		"mtime": "2026-10-24T17:15:20.655Z",
		"size": 28205,
		"path": "../public/images/watermelon.png"
	},
	"/images/water.png": {
		"type": "image/png",
		"etag": "\"6b81-a5HIzkHgoHDzOmhrkVFy86QKCWA\"",
		"mtime": "2026-10-24T17:15:20.655Z",
		"size": 27521,
		"path": "../public/images/water.png"
	},
	"/images/yogurt.png": {
		"type": "image/png",
		"etag": "\"513d-1Rrqs7mNMjMviM8WcmbAyxr66YI\"",
		"mtime": "2026-10-24T17:15:20.671Z",
		"size": 20797,
		"path": "../public/images/yogurt.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_batWhj = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_batWhj
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
