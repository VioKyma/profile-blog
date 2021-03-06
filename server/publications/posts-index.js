Meteor.publish( 'postsIndex', function() {
  return Posts.find( { published: true } );
});

Meteor.publish( 'tagsIndex', function( tag ) {
  check( tag, String );
  return Posts.find( { published: true, tags: { $in: [ tag ] } } );
});

Meteor.publish( 'postsFeatured', function() {
  return Posts.find( { featured: true } );
});
