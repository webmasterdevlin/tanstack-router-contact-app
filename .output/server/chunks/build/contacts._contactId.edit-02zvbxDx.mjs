import { notFound } from '@tanstack/react-router';
import { u, d as d$1 } from './contacts-DoWpUKty.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { R as Re } from '../../index.mjs';
import 'localforage';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:async_hooks';
import 'react';
import 'react-dom/server';
import 'zod';

function d() {
  const a = Re.useLoaderData(), n = Re.useParams(), o = Re.useNavigate();
  return jsxs("form", { id: "contact-form", onSubmit: async (c) => {
    c.preventDefault();
    const l = c.currentTarget, i = new FormData(l), s = Object.fromEntries(i.entries());
    await d$1(n.contactId, s), await o({ to: `/contacts/${n.contactId}` });
  }, children: [jsxs("p", { children: [jsx("span", { children: "Name" }), jsx("input", { placeholder: "First", "aria-label": "First name", type: "text", name: "first", defaultValue: a.first }), jsx("input", { placeholder: "Last", "aria-label": "Last name", type: "text", name: "last", defaultValue: a.last })] }), jsxs("label", { children: [jsx("span", { children: "Twitter" }), jsx("input", { type: "text", name: "twitter", placeholder: "@jack", defaultValue: a.twitter })] }), jsxs("label", { children: [jsx("span", { children: "Avatar URL" }), jsx("input", { placeholder: "https://example.com/avatar.jpg", "aria-label": "Avatar URL", type: "text", name: "avatar", defaultValue: a.avatar })] }), jsxs("label", { children: [jsx("span", { children: "Notes" }), jsx("textarea", { name: "notes", defaultValue: a.notes, rows: 6 })] }), jsxs("p", { children: [jsx("button", { type: "submit", children: "Save" }), jsx("button", { type: "button", onClick: () => o({ to: `/contacts/${a.id}` }), children: "Cancel" })] })] });
}
const V = function() {
  return React.createElement(d, null);
}, D = async ({ params: { contactId: a } }) => {
  const n = await u(a);
  if (!n) throw notFound({ _global: false });
  return n;
};

export { V as component, D as loader };
//# sourceMappingURL=contacts._contactId.edit-02zvbxDx.mjs.map
