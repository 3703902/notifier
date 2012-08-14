SOURCE=		APNs.js \
			config.js \
			deque.js \
			filters.js \
			GCM.js \
			loggerUtils.js \
			notificationRequest.js \
			notificationRequestTracker.js \
			notifier.js \
			postTracker.js \
			registrar.js \
			registrationFilter.js \
			registrationStore.js \
			server.js \
			templateManager.js \
			templateStore.js \
			templateCache.js \
			WNS.js

all: tests doc templateParser.js

templateParser.js: templateParser.pegjs
	node_modules/pegjs/bin/pegjs $^ $@

doc: README.html doc/*.html

# NOTE: the following relies on jsdoc-toolkit (http://code.google.com/p/jsdoc-toolkit).
doc/*.html: 
	/usr/local/lib/node_modules/noc/bin/noc -d=doc -t=/usr/local/lib/node_modules/noc/templates/codeview ${SOURCE}

clean:
	rm -f README.html templateParser.js

tests: templateParser.js
	vows test/*.js

%.html : %.md
	markdown_py $< > $@
