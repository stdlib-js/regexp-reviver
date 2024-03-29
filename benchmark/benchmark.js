/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var bench = require( '@stdlib/bench-harness' );
var parseJSON = require( '@stdlib/utils-parse-json' );
var regexp2json = require( '@stdlib/regexp-to-json' );
var pkg = require( './../package.json' ).name;
var reviver = require( './../lib' );


// VARIABLES //

var VALUES = [
	JSON.stringify( regexp2json( /beep/ ) ),
	JSON.stringify( regexp2json( /boop/ ) ),
	JSON.stringify( regexp2json( /.*/ ) ),
	JSON.stringify( regexp2json( /ab+c/ ) )
];


// MAIN //

bench( pkg+'::parse', function benchmark( b ) {
	var o;
	var i;

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		o = parseJSON( VALUES[ i%VALUES.length ], reviver );
		if ( typeof o !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( typeof o !== 'object' ) {
		b.fail( 'should return an object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});

bench( pkg+'::parse,no_reviver', function benchmark( b ) {
	var o;
	var i;

	b.tic();
	for ( i = 0; i < b.iterations; i++ ) {
		o = parseJSON( VALUES[ i%VALUES.length ] );
		if ( typeof o !== 'object' ) {
			b.fail( 'should return an object' );
		}
	}
	b.toc();
	if ( typeof o !== 'object' ) {
		b.fail( 'should return an object' );
	}
	b.pass( 'benchmark finished' );
	b.end();
});
