import { DOMImplementation, XMLSerializer as XMLSerializerShim } from 'xmldom';

export let document = {};
document.implementation = new DOMImplementation();

export let XMLSerializer = XMLSerializerShim;
