Posts = new Mongo.Collection( 'posts' );

Posts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Posts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let PostsSchema = new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this post published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
  "featured": {
    type: Boolean,
    label: "Is this post featured on the home page?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
  "author": {
    type: String,
    label: "The ID of the author of this post.",
    autoValue() {
      let user = Meteor.users.findOne( { _id: this.userId } );
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;
      }
    }
  },
  "updated": {
    type: String,
    label: "The date this post was last updated on.",
    autoValue() {
      let updated = this.value;
      if ( this.isInsert ) {
        return ( new Date() ).toISOString();
      }
    },
    optional: true
  },
  "title": {
    type: String,
    label: "The title of this post.",
    defaultValue: "Untitled Post"
  },
  "slug": {
    type: String,
    label: "The slug for this project.",
    autoValue() {
      let slug              = this.value,
          existingSlugCount = Posts.find( { _id: { $ne: this.docId }, slug: new RegExp( slug ) } ).count(),
          existingUntitled  = Posts.find( { slug: { $regex: /untitled-post/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-post-${ existingUntitled + 1 }` : 'untitled-post';
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this post.",
    optional: true
  },
  "preview": {
    type: String,
    label: "The preview displayed in the post listing.",
    optional: true
  },
  "tags": {
    type: [ String ],
    label: "The tags for this post.",
    optional: true
  }
});

Posts.attachSchema( PostsSchema );
