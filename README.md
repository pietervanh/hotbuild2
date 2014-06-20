# Hotbuild2

See [Uber Forums](https://forums.uberent.com/threads/rel-hotbuild2-v1-9-9-9-5-62165.54561/) for details

## Development

The project is set up to use [Grunt](http://gruntjs.com/) the JavaScript Task Runner to make a release.

The generated project includes a `package.json` that lists the dependencies, but you'll need to run `npm install` to download them.

The repository expects to be in a mod folder named `hotbuild2_dev`.  The default grunt task builds to `hotbuild2_test`.  The 'production' build is through:

    grunt release --target=hotbuild2
