PROJECT:=redispatch

BUILD ?= build/$(PROJECT)

.PHONY: all clean js test serve
all: test js

clean:
	rm -rf build

test: | node_modules
	`npm bin`/tape test/*.js

node_modules:
	npm install

%.min.js: %.js | node_modules
	`npm bin`/uglifyjs $< -o $@ -c -m

%.gz: %
	gzip -c9 $^ > $@

js: $(BUILD).js $(BUILD).min.js

$(BUILD).js: $(PROJECT).js | build
	`npm bin`/browserify $< > $@

build:
	mkdir -p build
