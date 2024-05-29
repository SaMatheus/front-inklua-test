'use client'

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { env } from "env.mjs";

const DynamicScript = dynamic(
  () => import('next/script'),
  { ssr: false }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let HT: any;

export function ClientSideScripts() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <DynamicScript
        src="https://plugin.handtalk.me/web/latest/handtalk.min.js"
        onReady={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const ht = new HT({
            token: env.NEXT_PUBLIC_HANDTALK_TOKEN,
            avatar: 'MAYA',
          })
        }}
      />
      <DynamicScript strategy="lazyOnload">
        {`
          ;(function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r
            ;(i[r] =
              i[r] ||
              function () {
                ;(i[r].q = i[r].q || []).push(arguments)
              }),
              (i[r].l = 1 * new Date())
            ;(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0])
            a.async = 1
            a.src = g
            m.parentNode.insertBefore(a, m)
          })(
            window,
            document,
            'script',
            'https://www.google-analytics.com/analytics.js',
            'ga'
          )

          ga('create', 'UA-121698825-1', 'auto')
          ga('send', 'pageview')
        `}
      </DynamicScript>
      <DynamicScript strategy="lazyOnload">
        {`
              ;(function (w, d, s, l, i) {
                w[l] = w[l] || []
                w[l].push({
                  'gtm.start': new Date().getTime(),
                  event: 'gtm.js',
                })
                var f = d.getElementsByTagName(s)[0],
                  j = d.createElement(s),
                  dl = l != 'dataLayer' ? '&l=' + l : ''
                j.async = true
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
                f.parentNode.insertBefore(j, f)
              })(window, document, 'script', 'dataLayer', 'GTM-PS6BJ7K')
        `}
      </DynamicScript>
      <DynamicScript strategy="lazyOnload">
        {`
              ;(function (h, o, t, j, a, r) {
                h.hj =
                  h.hj ||
                  function () {
                    ;(h.hj.q = h.hj.q || []).push(arguments)
                  }
                h._hjSettings = { hjid: 2980548, hjsv: 6 }
                a = o.getElementsByTagName('head')[0]
                r = o.createElement('script')
                r.async = 1
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv
                a.appendChild(r)
              })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=')
        `}
      </DynamicScript>
    </>
  )
}