(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45d5300e"],{"0c72":function(e,t,i){"use strict";var a=i("f0b5"),n=i.n(a);n.a},"8fd0":function(e,t,i){"use strict";i.r(t);var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("movie-list",{attrs:{pageMovies:e.$store.state.movie.searchRouterData}})],1)},n=[],o=i("db08"),s={components:{MovieList:o["a"]}},l=s,r=i("2877"),c=Object(r["a"])(l,a,n,!1,null,null,null);t["default"]=c.exports},db08:function(e,t,i){"use strict";var a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"movie-box"},e._l(e.pageMovies,(function(e){return i("movie-single",{key:e.name,attrs:{movieSingleData:e}})})),1)},n=[],o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"movie-box"},[i("ul",{staticClass:"movie-list"},[i("li",{staticClass:"movie"},[i("router-link",{attrs:{to:"/movie/"+e.movieSingleData.id}},[i("img",{attrs:{src:e.movieSingleData.imgSrc,alt:e.movieSingleData.name}})]),i("div",{staticClass:"movie-info-right"},[i("h1",[i("router-link",{attrs:{to:"/movie/"+e.movieSingleData.id}},[e._v(e._s(e.movieSingleData.name))])],1),i("p",[e._v(e._s(e.movieSingleData.detail))])])],1)])])},s=[],l={props:{movieSingleData:{type:Object,default:function(){}}}},r=l,c=(i("0c72"),i("2877")),u=Object(c["a"])(r,o,s,!1,null,"127ac30b",null),v=u.exports,m={props:{pageMovies:{type:Array,default:function(){return[]}}},components:{MovieSingle:v}},f=m,p=Object(c["a"])(f,a,n,!1,null,null,null);t["a"]=p.exports},f0b5:function(e,t,i){}}]);
//# sourceMappingURL=chunk-45d5300e.9198048a.js.map