{% extends 'layout.swig' %}

{% block content %}
  <h1>Error! {{ message }}</h1>
  <h2>{{ error.status }}</h2>
  <pre>{{ error.stack }}</pre>
{% endblock %}
