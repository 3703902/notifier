SOURCE=		APNs.js \
			GCM.js \
			WNS.js \
			app.js \
			applications.js \
			config.js \
			deque.js \
			filters.js \
			loggerUtils.js \
			monitor.js \
			notificationRequest.js \
			notificationRequestTracker.js \
			notifier.js \
			postTracker.js \
			registrar.js \
			registrationFilter.js \
			registrationStore.js \
			templateCache.js \
			templateManager.js \
			templateStore.js \

.PHONY: doc

all: tests docs templateParser.js README.html

templateParser.js: templateParser.pegjs
	node_modules/pegjs/bin/pegjs $^ $@

# NOTE: the following relies on jsdoc-toolkit (http://code.google.com/p/jsdoc-toolkit).
doc:
	/usr/local/lib/node_modules/noc/bin/noc -d=doc -t=/usr/local/lib/node_modules/noc/templates/codeview ${SOURCE}

clean:
	rm -f README.html templateParser.js

tests: templateParser.js
	vows test/*.js

%.html : %.md
	markdown_py $< > $@
