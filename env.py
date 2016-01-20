#!/usr/bin/env python

import jinja2

JINJA_ENV = jinja2.Environment(
  loader=jinja2.FileSystemLoader('view'),
  extensions=['jinja2.ext.autoescape'],
  autoescape=True
)
