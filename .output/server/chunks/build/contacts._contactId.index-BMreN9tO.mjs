import { notFound, useRouter } from '@tanstack/react-router';
import { u, d, w } from './contacts-DoWpUKty.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { v as ve } from '../../index.mjs';
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

const v = ({ contact: t }) => {
  let a = t.favorite;
  const o = useRouter();
  return jsx("form", { onSubmit: async (n) => {
    n.preventDefault(), await d(t.id, { ...t, favorite: !t.favorite }), await o.invalidate();
  }, children: jsx("button", { name: "favorite", value: a ? "false" : "true", "aria-label": a ? "Remove from favorites" : "Add to favorites", children: a ? "\u2605" : "\u2606" }) });
};
function h() {
  const t = ve.useLoaderData(), a = ve.useParams(), o = ve.useNavigate(), n = async (i) => {
    i.preventDefault(), await o({ to: `/contacts/${a.contactId}/edit` });
  }, s = async (i) => {
    i.preventDefault(), globalThis.confirm("Please confirm you want to delete this record.") && (await w(a.contactId), await o({ to: "/" }));
  };
  return jsxs("div", { id: "contact", children: [jsx("div", { children: jsx("img", { src: t.avatar || "https://ui-avatars.com/api/?name=no+name", alt: "avatar" }, t.avatar) }), jsxs("div", { children: [jsxs("h1", { children: [t.first || t.last ? jsxs(Fragment, { children: [t.first, " ", t.last] }) : jsx("i", { children: "No Name" }), " ", jsx(v, { contact: t })] }), t.twitter && jsx("p", { children: jsx("a", { target: "_blank", href: `https://twitter.com/${t.twitter}`, rel: "noopener noreferrer", children: t.twitter }) }), t.notes && jsx("p", { children: t.notes }), jsxs("div", { children: [jsx("form", { onSubmit: n, children: jsx("button", { type: "submit", children: "Edit" }) }), jsx("form", { onSubmit: s, children: jsx("button", { type: "submit", children: "Delete" }) })] })] })] });
}
const N = function() {
  return React.createElement(h, null);
}, S = async ({ params: { contactId: t } }) => {
  const a = await u(t);
  if (!a) throw notFound({ _global: false });
  return a;
};

export { N as component, S as loader };
//# sourceMappingURL=contacts._contactId.index-BMreN9tO.mjs.map
