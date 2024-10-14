import { registerBlockBindingsSource } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { store as coreDataStore } from '@wordpress/core-data';

const allowedAttributes = [ 'name', 'description', 'url', 'nickname' ];

registerBlockBindingsSource( {
	name: 'my-plugin/user-data',
	label: __( 'User Data' ),
	usesContext: [ 'postAuthor' ],
	getValues( { select, context, bindings } ) {
		const values = {};
		for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
			if( allowedAttributes.includes( source.args.key ) && source.args.userSlug ) {
				const users = select('core').getUsers();
				const user = users ? users.find(user => user.slug === source.args.userSlug) : null;
				values[ attributeName ] = user?.[ source.args.key ];
			}
		}
		return values;
	},
	setValues( { select, dispatch, context, bindings } ) {
		const newValues = {};
		let userId = null;
		for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
			if( allowedAttributes.includes( source.args.key) && source.args.userSlug ) {
				const users = select('core').getUsers();
				const user = users ? users.find(user => user.slug === source.args.userSlug) : null;
				userId = user.id;
				newValues[ source.args.key ] = source.newValue;
			}
		}
		if( Object.keys( newValues ).length > 0 ) {		
			dispatch( 'core' ).editEntityRecord( 'root', 'user', userId, newValues )
				.then(() => {
					dispatch( 'core' ).saveEditedEntityRecord( 'root', 'user', userId );
					// Force the editor to be marked as dirty
					dispatch( 'core/editor' ).editPost({ meta: { _dummy: Date.now() } });
				});	
		}
	},	
	canUserEditValue( { select, context, args } ) {
		if( allowedAttributes.includes( args.key ) && args.userSlug !== undefined ) {
			return true;
		}
		return false;
	},
});

// registerBlockBindingsSource( {
// 	name: 'register-custom-editor-source/custom-post-meta',
// 	label: 'Custom Editor Source',
// 	usesContext: [ 'postType', 'postId' ],
//     getValues( { select, context, bindings } ) {
// 		// const metaFields = getPostMetaFields( select, context );

// 		const newValues = {};
// 		// for ( const [ attributeName, source ] of Object.entries( bindings ) ) {
// 		// 	// Use the value, the field label, or the field key.
// 		// 	const fieldKey = source.args.key;
// 		// 	const { value: fieldValue, label: fieldLabel } =
// 		// 		metaFields?.[ fieldKey ] || {};
// 		// 	newValues[ attributeName ] = fieldValue ?? fieldLabel ?? fieldKey;
// 		// }
// 		return { content: 'test' };
// 	},
// 	setValues( { dispatch, context, bindings } ) {
// 		const newMeta = {};
// 		Object.values( bindings ).forEach( ( { args, newValue } ) => {
// 			newMeta[ args.key ] = newValue;
// 		} );

// 		dispatch( coreDataStore ).editEntityRecord(
// 			'postType',
// 			context?.postType,
// 			context?.postId,
// 			{
// 				meta: newMeta,
// 			}
// 		);
// 	},
// 	canUserEditValue: () => true,
//     getFieldsList( fieldsListArgs ) {  
//         const { select, context } = fieldsListArgs;
//         return {
//             field1: {
//                 label: 'Field 1',
//                 value: 'test',
//             },
//             field2: {
//                 label: 'Field 2',
//                 value: 'test2',
//             }
//         }
//     },
// });