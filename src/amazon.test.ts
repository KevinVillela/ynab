import { describe, expect, test } from '@jest/globals';
import { parseTransactions, parseOrders } from './amazon';
import { parse } from 'ts-jest';

describe('Amazon', () => {
  test('Parses transactions web page correctly', () => {
    const webPage = `<div data-pmts-component-id="pp-AjAeda-1" class="a-section a-spacing-none pmts-widget-section pmts-portal-root-hsZraljrXIte pmts-portal-component pmts-portal-components-pp-AjAeda-1"><div class="a-row a-spacing-medium"><span>To see all your gift card transactions including refunds, view <a href="/gc/balance">your gift card balance and activity.</a></span></div><div id="pp-AjAeda-58" data-pmts-component-id="pp-AjAeda-2" class="a-section a-spacing-none pmts-loading-async-widget-spinner-overlay a-hidden aok-hidden  pmts-portal-component pmts-portal-components-pp-AjAeda-2"><img alt="" src="https://m.media-amazon.com/images/G/01/payments-portal/r1/loading-4x._CB485930688_.gif" class="pmts-loading-async-widget-spinner-viewport-centered"></div><form method="post" action="https://www.amazon.com:443/cpe/yourpayments/transactions" class="a-spacing-none"><input type="hidden" name="ppw-widgetState" value="4-MS08opaU7pyDATo1ZaHu7sf_L8UsUdXwuRfl3B5gkHfU63ZMQVqJ0OYA9wbfRKcTp6TVK1mVJFaQm68HJ9kgCWT4zflDMichxnxMQ1sEmDKWGcaa4PRKYMr3ffHM8j4TlEdnqWt8FONjIKTg8YpbVA9sylInse7UXynJaaLtqkcwXhkG8fQrCDlzQ5R9x1nQ-NyrbddbJrANf64mYd8LrvpNWqqQvc8IawB8oLB66N1eboqj59lPYFOtlfamUoYUf6AoVawgQEEnTBqetC82KYFsThGz9a4GWJvEDpbbagnJRhEKu5hLFjD8DYahbegbA-GQtuRix36LY5ya1JXzwRHeeBRHz9-jWe3hpfay7lPxDAz8xgHZLmFLdpueQsIDWDRvy7L5u9Hqi5MFXdZLdGj3DD2qUwLkWq-_nvpkxW9AufQ81vTDPUFtshhvEUdHXhkDfmphPQ8kgl0jVbRbDIARJdp-GP58s3gU3aec7w2xXoNt0MqVKw5uMdDqtjkkQ8qHhEwQF-ThR1BR1NTKnl2n_YJMZUcLLSiyh-Ep0J6kIoSJxJKkZhnThvlD-EpP0YciV6Bwwgcv_D8Q-_SKJH3-e7Ojf7z81p7X2unFvn30trUucky0j8nQ7M-uRvYiXiif34dS_3wV_U4DsolW0Nhxl2mgWlUD7xn0rl0QmdC-NND2FU6AxtMfBrpPWTwvi2JUUMh44cSUJJw1FzmPtK_ZDBrGhaOSnRCKA-eu2hTZqjKal0b8BPFjiCQcWXMwj8GidHuSytHtyuMeDPS8Lrfl2DoQCc8VFVQxm4dynokyzw5eErDmV07EUEpAPEAYuYDZ4Cu62wqcWilTTAMPBW8uJwxilzQEbtHyl5hFK4TzphN6nasy1mQG_quHL3NUB8bS-fbvjo8k-4X61THV0E0ZkiAWPW6FaHWrnEmjf2Piyvx-Eum6yMxwvVDFEmhFbqQHMXDbA5cZiL3ibeg6HhE1MFnZ0kIBam1BTc_f8NqfTfEPJQo_Xt0486aHb32zL0mwJgYX45o7Ir1qeBNMbWOw1kIMGwLRKE4tdLtrSjmIoGHA8eb5J7hgFEG79RxMZPX2XUlYEP6hltyS8eiMwoSQUZdthKUyfX6hvvXhW2V1iNmaXwK-8HDfSE5oI-YE8VyYU0IVxXYaK-Y2l-FCYbzRc90S3xqiTHYuPAtrXS24IHgGXYDE4HpkO-7gmQTDhlRTLTgcya9GDQ4gkGYmD_m_lS2eNEQNnHl_A2YqzWMJDZkWRvb7dfUyBKlqyzFMrom5-oIr7-qgWKlXscCAvKU1D5vX5lwpM1uf7-MYqb1bPa92YApqhSzN2tRE7g-8axofD6aLKkCAEZbRPWzQsmxHJJw3oQxERquM9HfXUQDpYTlWqrozg5uYbe_rOcn7FhKIm1EbYbBB6bc5PN8ZseltSkcjAt_NY4Dv9WInvCyTMsfEAJyccnhZBsG2npDBqpoZBCXDw1EkEaTlkApaiHvclBqPYcS2A-vOH6A8WUrbApQKa3TZbkYOCw-77-KWseXOIBA5rgKGgCMkrfC3ycTJVS9xoM-5_4r6haWnfsmBVLbq79-Fa0kgU-wa3EFmO45YwG4YPL1_iA44mh2CdhGfy1DQkzEUFOxEMvHSveTyT7snzWxBtp-tOrRodcvvC3GW53eeXg6t_TSg9yjxZKtyLjvlJOkFMXp_WJWcz-4JTk8Q5hhWQTVD-bIQgehQiIk6r_RApZzGET8PAnhcXHye1SWRi1hzyNuCMiv2KFQer9STgoDy9OkE6Mr8LbJ-xT6xMBvhsX1JGX7vRfDEdGdsEAX38fdCMQnVNCc0Hna8fMMF7cB36w201CcsLs2NnmTecKjsdv0JazSMDJdPVV91ooToK-_4voCf_lhJLed6bIHaCGe4sV3nAZXmhbOQ2iKTiHlP064yh-lbtMeST9C9-RVd5YkaZN-0dx6lhAmv1JmOoSHqP4eODZNa5LUPt48Ub8Rxp7mGqfrv4XvZaX_U9PT6icGHDQqN5xjgb3NSsNqYMSS5KOQNJDbpKrPHFQ3w3hHe63LEXz40XmgVQATK0a73U-0qLF4JJxecc5gMRld6htcnJgtGDBCGerHcbuR-tS6iHarYI0Y6jAZh_YQvuP6pp3nmUed--BtN_A-fD0Y2Pa4mqCCXKIBWF84pQCfx81XIPrb2FcXPdOBO9ejN4fgOagNDBBsMqmmLUsZDFE59tjElNIZSY2QPMQCHXM0xybWmJrN8LaXAR7dZ1mIeQafih3Bs6-4PdIciyqL74lPQWWs5qrIygtmA6AJLF96TICmJGf-qdatzd-5fpIWis4oKmDSHHvxR0z3GFI3u-xekO9Hko62L7Jf9_fuHQlpLG7VT_CwYObr0sJsipSBNQMMPOcb9zIEfe-bk66wDQuwT52kws8KuPerCx7wpR3dkYB3_mqA25FqR-W5uzo3uO7B3T598aSPwPhXPDv_3XoomV1T8X4OYSPXsDI5ca9dkXqliEMawfMyfWoiKBZFnepk98zobxopReSYQqO4rqHqYvMGub786jx8HMJAXOWn7i1JttEA-zn39c4tD0Wzgk0-JMynExZOlVCe2JH_BOXnhhItQ-XIC1HvdrdrbwyGnYrDFltd3lkePEo8ETSwg7CqXpYb5T1jqSPz8-ZxbS3Fim_dhoQufkWYzBz_BrgpuudpwVNafV91CLin4PJcWezObQxIV_qUG4Rh7Pq8XFOaFkW-Nzk402nrO7Jorjq48k3tGA092CQPr9b5n7_HmMGjOJWGZx5WheYm5PUQef_-ZLDbXKtYYHOJWN2bYNDo98Y1otDwg5B66_r8_LIswR0yeiCX3sJnkzKBTT-4WIp95r9bg2deuEtuSI52RmhukQ6R0YMCr9DIC69-DF1e-f4izbfiEKgBDFt5ySw"><input type="hidden" name="ie" value="UTF-8"><div class="a-box-group a-spacing-base"><div class="a-box a-spacing-none a-box-title apx-transactions-sleeve-header-container"><div class="a-box-inner a-padding-base"><span class="a-size-base a-text-bold">In Progress</span></div></div><div class="a-box a-spacing-base"><div class="a-box-inner a-padding-none"><div data-pmts-component-id="pp-AjAeda-52" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-52"><span>February 17, 2024</span></div><div data-pmts-component-id="pp-AjAeda-52" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-52"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-53" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-53"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****4273</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$10.11</span></div></div><div data-pmts-component-id="pp-AjAeda-53" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-53"><div class="a-column a-span6"><span class="a-size-base a-color-base">Pending</span></div></div><div data-pmts-component-id="pp-AjAeda-53" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-53"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-59" class="a-link-normal" href="https://www.amazon.com/gp/css/order-details?orderID=D01-8296102-8717012">Order #D01-8296102-8717012</a></div></div></div><div data-pmts-component-id="pp-AjAeda-53" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-53"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Audible</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-55" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-55"><span>February 16, 2024</span></div><div data-pmts-component-id="pp-AjAeda-55" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-55"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-56" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-56"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$11.44</span></div></div><div data-pmts-component-id="pp-AjAeda-56" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-56"><div class="a-column a-span6"><span class="a-size-base a-color-base">Pending</span></div></div><div data-pmts-component-id="pp-AjAeda-56" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-56"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-60" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=111-7250768-6838629">Order #111-7250768-6838629</a></div></div></div><div data-pmts-component-id="pp-AjAeda-56" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-56"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div></div></div></div><div class="a-box-group a-spacing-base"><div class="a-box a-spacing-none a-box-title apx-transactions-sleeve-header-container"><div class="a-box-inner a-padding-base"><span class="a-size-base a-text-bold">Completed</span></div></div><div class="a-box a-spacing-base"><div class="a-box-inner a-padding-none"><div data-pmts-component-id="pp-AjAeda-3" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-3"><span>February 18, 2024</span></div><div data-pmts-component-id="pp-AjAeda-3" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-3"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-4" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-4"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****4273</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$6.99</span></div></div><div data-pmts-component-id="pp-AjAeda-4" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-4"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-61" class="a-link-normal" href="https://www.amazon.com/gp/css/order-details?orderID=D01-6826194-4541007">Order #D01-6826194-4541007</a></div></div></div><div data-pmts-component-id="pp-AjAeda-4" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-4"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Prime Video Channels</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-6" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-6"><span>February 17, 2024</span></div><div data-pmts-component-id="pp-AjAeda-6" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-6"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-7" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-7"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$64.63</span></div></div><div data-pmts-component-id="pp-AjAeda-7" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-7"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-62" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-6297509-6345003">Order #113-6297509-6345003</a></div></div></div><div data-pmts-component-id="pp-AjAeda-7" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-7"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div><div class="a-section a-spacing-none"><hr class="a-spacing-base a-divider-normal"></div><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-9" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-9"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$4.27</span></div></div><div data-pmts-component-id="pp-AjAeda-9" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-9"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-63" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-4236063-9788240">Order #113-4236063-9788240</a></div></div></div><div data-pmts-component-id="pp-AjAeda-9" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-9"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div><div class="a-section a-spacing-none"><hr class="a-spacing-base a-divider-normal"></div><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-11" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-11"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$56.50</span></div></div><div data-pmts-component-id="pp-AjAeda-11" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-11"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-64" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-6819175-3885039">Order #113-6819175-3885039</a></div></div></div><div data-pmts-component-id="pp-AjAeda-11" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-11"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-13" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-13"><span>February 16, 2024</span></div><div data-pmts-component-id="pp-AjAeda-13" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-13"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-14" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-14"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$56.73</span></div></div><div data-pmts-component-id="pp-AjAeda-14" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-14"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-65" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-2004164-8798661">Order #113-2004164-8798661</a></div></div></div><div data-pmts-component-id="pp-AjAeda-14" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-14"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-16" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-16"><span>February 15, 2024</span></div><div data-pmts-component-id="pp-AjAeda-16" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-16"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-17" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-17"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$16.01</span></div></div><div data-pmts-component-id="pp-AjAeda-17" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-17"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-66" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-1752303-5039465">Order #113-1752303-5039465</a></div></div></div><div data-pmts-component-id="pp-AjAeda-17" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-17"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-19" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-19"><span>February 14, 2024</span></div><div data-pmts-component-id="pp-AjAeda-19" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-19"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-20" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-20"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****1196</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$82.39</span></div></div><div data-pmts-component-id="pp-AjAeda-20" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-20"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-67" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=112-0500970-5652250">Order #112-0500970-5652250</a></div></div></div><div data-pmts-component-id="pp-AjAeda-20" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-20"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-22" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-22"><span>February 13, 2024</span></div><div data-pmts-component-id="pp-AjAeda-22" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-22"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-23" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-23"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$36.28</span></div></div><div data-pmts-component-id="pp-AjAeda-23" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-23"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-68" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-1940242-8893059">Order #113-1940242-8893059</a></div></div></div><div data-pmts-component-id="pp-AjAeda-23" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-23"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div><div class="a-section a-spacing-none"><hr class="a-spacing-base a-divider-normal"></div><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-25" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-25"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$27.37</span></div></div><div data-pmts-component-id="pp-AjAeda-25" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-25"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-69" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-4406184-1301839">Order #113-4406184-1301839</a></div></div></div><div data-pmts-component-id="pp-AjAeda-25" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-25"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-27" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-27"><span>February 12, 2024</span></div><div data-pmts-component-id="pp-AjAeda-27" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-27"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-28" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-28"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$14.97</span></div></div><div data-pmts-component-id="pp-AjAeda-28" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-28"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-70" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-7792428-4313012">Order #113-7792428-4313012</a></div></div></div><div data-pmts-component-id="pp-AjAeda-28" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-28"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-30" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-30"><span>February 11, 2024</span></div><div data-pmts-component-id="pp-AjAeda-30" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-30"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-31" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-31"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9983</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$29.96</span></div></div><div data-pmts-component-id="pp-AjAeda-31" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-31"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-71" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-6541332-9485026">Order #113-6541332-9485026</a></div></div></div><div data-pmts-component-id="pp-AjAeda-31" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-31"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-33" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-33"><span>February 9, 2024</span></div><div data-pmts-component-id="pp-AjAeda-33" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-33"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-34" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-34"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$16.57</span></div></div><div data-pmts-component-id="pp-AjAeda-34" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-34"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-72" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-4069233-7794654">Order #113-4069233-7794654</a></div></div></div><div data-pmts-component-id="pp-AjAeda-34" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-34"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div><div class="a-section a-spacing-none"><hr class="a-spacing-base a-divider-normal"></div><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-36" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-36"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$10.69</span></div></div><div data-pmts-component-id="pp-AjAeda-36" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-36"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-73" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-7817090-1497851">Order #113-7817090-1497851</a></div></div></div><div data-pmts-component-id="pp-AjAeda-36" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-36"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">AMZN Mktp US</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-38" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-38"><span>February 8, 2024</span></div><div data-pmts-component-id="pp-AjAeda-38" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-38"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-39" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-39"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$3.31</span></div></div><div data-pmts-component-id="pp-AjAeda-39" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-39"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-74" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-6834166-4790640">Order #113-6834166-4790640</a></div></div></div><div data-pmts-component-id="pp-AjAeda-39" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-39"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div><div class="a-section a-spacing-none"><hr class="a-spacing-base a-divider-normal"></div><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-41" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-41"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$21.67</span></div></div><div data-pmts-component-id="pp-AjAeda-41" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-41"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-75" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-9705529-4504224">Order #113-9705529-4504224</a></div></div></div><div data-pmts-component-id="pp-AjAeda-41" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-41"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-43" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-43"><span>February 7, 2024</span></div><div data-pmts-component-id="pp-AjAeda-43" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-43"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-44" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-44"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$15.64</span></div></div><div data-pmts-component-id="pp-AjAeda-44" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-44"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-76" class="a-link-normal" href="https://www.amazon.com/gp/css/summary/edit.html?orderID=113-9061647-5844221">Order #113-9061647-5844221</a></div></div></div><div data-pmts-component-id="pp-AjAeda-44" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-44"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Amazon.com</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-46" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-46"><span>February 6, 2024</span></div><div data-pmts-component-id="pp-AjAeda-46" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-46"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-47" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-47"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****4273</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$10.15</span></div></div><div data-pmts-component-id="pp-AjAeda-47" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-47"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-77" class="a-link-normal" href="https://www.amazon.com/gp/css/order-details?orderID=D01-0405023-6371441">Order #D01-0405023-6371441</a></div></div></div><div data-pmts-component-id="pp-AjAeda-47" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-47"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Kindle Svcs</span></div></div></div></div></div><div data-pmts-component-id="pp-AjAeda-49" class="a-section a-spacing-base a-padding-base apx-transaction-date-container pmts-portal-component pmts-portal-components-pp-AjAeda-49"><span>February 5, 2024</span></div><div data-pmts-component-id="pp-AjAeda-49" class="a-section a-spacing-base pmts-portal-component pmts-portal-components-pp-AjAeda-49"><div class="a-section a-spacing-base apx-transactions-line-item-component-container"><div data-pmts-component-id="pp-AjAeda-50" class="a-row pmts-portal-component pmts-portal-components-pp-AjAeda-50"><div class="a-column a-span9"><span class="a-size-base a-text-bold">Visa ****9931</span></div><div class="a-column a-span3 a-text-right a-span-last"><span class="a-size-base-plus a-text-bold">-$8.73</span></div></div><div data-pmts-component-id="pp-AjAeda-50" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-50"><div class="a-row"><div class="a-column a-span12"><a id="pp-AjAeda-78" class="a-link-normal" href="https://www.amazon.com/gp/css/order-details?orderID=D01-9700884-2358605">Order #D01-9700884-2358605</a></div></div></div><div data-pmts-component-id="pp-AjAeda-50" class="a-section a-spacing-none a-spacing-top-mini pmts-portal-component pmts-portal-components-pp-AjAeda-50"><div class="a-row"><div class="a-column a-span12"><span class="a-size-base">Kindle Svcs</span></div></div></div></div></div></div></div></div><div class="a-row a-spacing-top-extra-large"><div class="a-column a-span2 a-text-center"><span class="a-button a-button-disabled a-button-span12 a-button-base" id="a-autoid-0"><span class="a-button-inner"><input disabled="disabled" class="a-button-input" type="submit" aria-labelledby="a-autoid-0-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-0-announce">Previous Page</span></span></span></div><div class="a-column a-span2 a-text-center a-span-last"><span class="a-button a-button-span12 a-button-base" id="a-autoid-1"><span class="a-button-inner"><input name="ppw-widgetEvent:DefaultNextPageNavigationEvent:{&quot;nextPageKey&quot;:&quot;YW16bjEudHJhbnNhY3Rpb24uaG9wcy5ZVzE2YmpFdWNHMWphR0Z5WjJVdWNHTmxjeTVaVnpFMlltcEZkV05IVGpSTWJrSm9aVmN4YkdKdVVYUmFXR2hzV1ROV01HRlhPWFZNYmxsNFRHdEdVa3hzUWxKTWEwWkNVVlZLY1ZkSVpIZFRNbk4zVEdwc2VsSkZPVU5aTUU1aFpHeEtWbFo2V1ROV2FtaHdaREJvUkU5V1JRLlFURkpWMDlMTnpkWFNscFhWbEkuWVcxNmJqRXVjSEJzWVc0dVFWRXVVVkV1UVVGQlFtcFlkMjlaVFVVdWVYRjZUWGh3V1VoNlkxRnJabWMzVlRCRlkwVkpRUzB4.QXBwcm92ZWQ...&quot;}" class="a-button-input" type="submit" aria-labelledby="a-autoid-1-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-1-announce">Next Page</span></span></span></div></div></form></div>`

    expect(parseTransactions(webPage)).toStrictEqual([
      {
        orderNumber: 'D01-8296102-8717012',
        orderDate: new Date(2024, 1, 17),
        priceInCents: -1011,
        payee: 'Pending'
      },
      {
        orderNumber: '111-7250768-6838629',
        orderDate: new Date(2024, 1, 16),
        priceInCents: -1144,
        payee: 'Pending'
      },
      {
        orderNumber: 'D01-6826194-4541007',
        orderDate: new Date(2024, 1, 18),
        priceInCents: -699,
        payee: 'Prime Video Channels'
      },
      {
        orderNumber: '113-6297509-6345003',
        orderDate: new Date(2024, 1, 17),
        priceInCents: -6463,
        payee: 'AMZN Mktp US'
      },
      {
        orderDate: new Date(2024, 1, 17),
        orderNumber: "113-4236063-9788240",
        payee: "AMZN Mktp US",
        priceInCents: -427,
      },
      {
        orderDate: new Date(2024, 1, 17),
        orderNumber: "113-6819175-3885039",
        payee: "AMZN Mktp US",
        priceInCents: -5650,
      },
      {
        orderNumber: '113-2004164-8798661',
        orderDate: new Date(2024, 1, 16),
        priceInCents: -5673,
        payee: 'AMZN Mktp US'
      },
      {
        orderNumber: '113-1752303-5039465',
        orderDate: new Date(2024, 1, 15),
        priceInCents: -1601,
        payee: 'Amazon.com'
      },
      {
        orderNumber: '112-0500970-5652250',
        orderDate: new Date(2024, 1, 14),
        priceInCents: -8239,
        payee: 'Amazon.com'
      },
      {
        orderNumber: '113-1940242-8893059',
        orderDate: new Date(2024, 1, 13),
        priceInCents: -3628,
        payee: 'AMZN Mktp US'
      },
      {
        orderDate: new Date(2024, 1, 13),
        orderNumber: "113-4406184-1301839",
        payee: "AMZN Mktp US",
        priceInCents: -2737,
      },
      {
        orderNumber: '113-7792428-4313012',
        orderDate: new Date(2024, 1, 12),
        priceInCents: -1497,
        payee: 'Amazon.com'
      },
      {
        orderNumber: '113-6541332-9485026',
        orderDate: new Date(2024, 1, 11),
        priceInCents: -2996,
        payee: 'AMZN Mktp US'
      },
      {
        orderNumber: '113-4069233-7794654',
        orderDate: new Date(2024, 1, 9),
        priceInCents: -1657,
        payee: 'Amazon.com'
      },
      {
        orderDate: new Date(2024, 1, 9),
        orderNumber: "113-7817090-1497851",
        payee: "AMZN Mktp US",
        priceInCents: -1069,
      },
      {
        orderNumber: '113-6834166-4790640',
        orderDate: new Date(2024, 1, 8),
        priceInCents: -331,
        payee: 'Amazon.com'
      },
      {
        orderDate: new Date(2024, 1, 8),
        orderNumber: "113-9705529-4504224",
        payee: "Amazon.com",
        priceInCents: -2167,
      },
      {
        orderNumber: '113-9061647-5844221',
        orderDate: new Date(2024, 1, 7),
        priceInCents: -1564,
        payee: 'Amazon.com'
      },
      {
        orderNumber: 'D01-0405023-6371441',
        orderDate: new Date(2024, 1, 6),
        priceInCents: -1015,
        payee: 'Kindle Svcs'
      },
      {
        orderNumber: 'D01-9700884-2358605',
        orderDate: new Date(2024, 1, 5),
        priceInCents: -873,
        payee: 'Kindle Svcs'
      }
    ]);
  });

  test('Parses orders web page correctly', () => {
    const webPage = `Orders page: <div id="a-page"><script type="a-state" data-a-state="{&quot;key&quot;:&quot;a-wlab-states&quot;}">{"AUI_A11Y_6_837773":"C","AUI_TNR_V2_180836":"C","AUI_PRELOAD_261698":"C","AUI_TEMPLATE_WEBLAB_CACHE_333406":"C","AUI_72554":"C","AUI_A11Y_1_699934":"C","AUI_A11Y_4_835613":"C","AUI_KILLSWITCH_CSA_LOGGER_372963":"C","AUI_A11Y_SR_678508":"C","AUI_REL_NOREFERRER_NOOPENER_309527":"C","AUI_PCI_RISK_BANNER_210084":"C"}</script><script>typeof uex === 'function' && uex('ld', 'portal-bb', {wb: 1})</script><!-- sp:end-feature:start-body -->
    <div class="a-row a-spacing-medium">
        <div class="a-column a-span6">
            <h1>Your Orders</h1>
        </div>
        <div class="a-column a-span6 a-span-last">
            <div class="search-bar">
        <form method="get" action="/gp/your-account/order-history/ref=ppx_yo2ov_dt_b_search" class="a-spacing-none">
            <input type="hidden" name="opt" value="ab">
            
            <div class="search-bar__input-container">
                <label for="searchOrdersInput" class="a-form-label"></label>
                <div class="a-search a-span12" aria-label="Search all orders"><i class="a-icon a-icon-search"></i><input type="search" id="searchOrdersInput" placeholder="Search all orders" name="search" spellcheck="false" class="a-input-text a-span12" aria-label="Search all orders"></div>
            </div>
            <div class="search-bar__button-container">
                <span class="a-button a-button-search" id="a-autoid-0"><span class="a-button-inner"><input class="a-button-input" type="submit" aria-labelledby="a-autoid-0-announce"><span class="a-button-text" aria-hidden="true" id="a-autoid-0-announce">Search Orders</span></span></span>
            </div>
        </form>
    </div>
    
        </div>
    </div>
    
    <div class="a-section a-spacing-medium page-tabs">
        <ul role="tablist">
            
                
                    <li class="page-tabs__tab page-tabs__tab--selected" role="tab">
                        Orders
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="/gp/buyagain?ref_=ppx_yo2ov_dt_b_tb_buy_again">Buy Again</a>
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="/gp/your-account/order-history?ref_=ppx_yo2ov_dt_b_tb_open&amp;orderFilter=open">Not Yet Shipped</a>
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="/gp/your-account/order-history?ref_=ppx_yo2ov_dt_b_tb_digital_m6&amp;orderFilter=months-6&amp;unifiedOrders=0&amp;digitalOrders=1">Digital Orders</a>
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="/gp/your-account/order-history?ref_=ppx_yo2ov_dt_b_tb_fresh_m6&amp;orderFilter=freshOrders-months-6">Local Store Orders</a>
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="https://pay.amazon.com/jr/your-account/orders?ref=ppx_yo2ov_dt_b_amazonPay">Amazon Pay</a>
                    </li>
                
            
                
                    <li class="page-tabs__tab" role="tab">
                        <a class="a-link-normal" href="/gp/your-account/order-history?ref_=ppx_yo2ov_dt_b_tb_cancel&amp;orderFilter=cancelled">Cancelled Orders</a>
                    </li>
                
            
        </ul>
    </div>
    
    <div class="a-row a-spacing-base">
        <form method="get" action="/your-orders/orders" class="js-time-filter-form a-spacing-none">
            
                <label for="time-filter" class="a-form-label time-filter__label aok-inline-block a-text-normal">
        <span class="num-orders">78 orders</span> placed in
    </label>
                <span class="a-dropdown-container"><select name="timeFilter" autocomplete="off" id="time-filter" tabindex="0" class="a-native-dropdown">
        
            <option data-ref="d30" value="last30">
                last 30 days
            </option>
        
            <option data-ref="m3" value="months-3" selected="">
                past 3 months
            </option>
        
            <option data-ref="y2024" value="year-2024">
                2024
            </option>
        
            <option data-ref="y2023" value="year-2023">
                2023
            </option>
        
            <option data-ref="y2022" value="year-2022">
                2022
            </option>
        
            <option data-ref="y2021" value="year-2021">
                2021
            </option>
        
            <option data-ref="y2020" value="year-2020">
                2020
            </option>
        
            <option data-ref="y2019" value="year-2019">
                2019
            </option>
        
            <option data-ref="y2018" value="year-2018">
                2018
            </option>
        
            <option data-ref="y2017" value="year-2017">
                2017
            </option>
        
            <option data-ref="y2016" value="year-2016">
                2016
            </option>
        
            <option data-ref="y2015" value="year-2015">
                2015
            </option>
        
            <option data-ref="y2014" value="year-2014">
                2014
            </option>
        
            <option data-ref="y2013" value="year-2013">
                2013
            </option>
        
            <option data-ref="y2012" value="year-2012">
                2012
            </option>
        
            <option data-ref="y2011" value="year-2011">
                2011
            </option>
        
            <option data-ref="archived" value="archived">
                Archived Orders
            </option>
        
    </select><span tabindex="-1" class="a-button a-button-dropdown" aria-hidden="true" id="a-autoid-1" style="min-width: 0.0588235%;"><span class="a-button-inner"><span class="a-button-text a-declarative" data-action="a-dropdown-button" role="button" aria-hidden="true" id="a-autoid-1-announce"><span class="a-dropdown-prompt">
                past 3 months
            </span></span><i class="a-icon a-icon-dropdown"></i></span></span></span>
            
    
            
                <input type="hidden" name="ref_" value="ppx_yo2ov_dt_b_filter_all">
            
        </form>
        <script>
            P.declare("time-filter-form-ready", {});
        </script>
    </div>
    
    
            
    
            
        <div id="unread-safety-warning-banner" class="a-box a-alert a-alert-warning page-banner--hidden-by-default a-spacing-medium a-spacing-top-medium"><div class="a-box-inner a-alert-container"><h4 class="a-alert-heading">An item you bought has been recalled</h4><i class="a-icon a-icon-alert"></i><div class="a-alert-content">
        To ensure your safety, go to <a class="a-link-normal" href="/your-product-safety-alerts?ref_=yo_banner_orders_view_bsx_ypsa">Your Recalls and Product Safety Alerts</a> and see recall information.
    </div></div></div>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">March 2, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $44.12
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-2940723-0981046</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-2940723-0981046&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-2940723-0981046&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text delivery-box__primary-text--text-normal a-text-bold">Arriving tomorrow by 9 PM</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Shipped</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B06XSLW9PY?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Carlson - Elite Omega-3 Gems, 1600 mg Omega-3 Fatty Acids Including EPA and DHA, Norwegian Fish Oil Supplement, Wild Caught, Sustainably Sourced Capsules, Lemon, 90+30 Softgels" src="https://m.media-amazon.com/images/I/51667JcXAcL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/51667JcXAcL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B06XSLW9PY?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Carlson - Elite Omega-3 Gems, 1600 mg Omega-3 Fatty Acids Including EPA and DHA, Norwegian Fish Oil Supplement, Wild Caught, Sustainably Sourced Capsules, Lemon, 90+30 Softgels
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-2"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDZYU0xXOVBZIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-2-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-3"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlojpuhosrtuun&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-2940723-0981046&amp;shipmentId=GHvx4k6vk" class="a-button-text" role="button" id="a-autoid-3-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-4"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-2940723-0981046&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-4-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-5"><span class="a-button-inner"><a href="/gp/help/contact/contact.html?marketplaceId=ATVPDKIKX0DER&amp;ref=ppx_yo2ov_dt_b_prod_question&amp;assistanceType=order&amp;orderId=113-2940723-0981046&amp;subject=2&amp;recipientId=AM56E6KTXTGYG&amp;step=submitEntry" class="a-button-text" role="button" id="a-autoid-5-announce">
                Get help
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-6"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B06XSLW9PY&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-6-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-2940723-0981046&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-2940723-0981046&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-a3d5ddd948d75e70e092dcfa9f733f46");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 25, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $10.69
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-426eb2618e06fabac2de22b5a05adff1">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-426eb2618e06fabac2de22b5a05adff1&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-426eb2618e06fabac2de22b5a05adff1">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-1254797-0185840</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 27</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B09RTPYD37?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Nuby Clik-It Soft Spout No-Spill Easy Grip Sippy Cup for Girls - (3-Pack) 10 Oz - 6+ Months" src="https://m.media-amazon.com/images/I/41YljXhVErL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41YljXhVErL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B09RTPYD37?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Nuby Clik-It Soft Spout No-Spill Easy Grip Sippy Cup for Girls - (3-Pack) 10 Oz - 6+ Months
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through May 27, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-7"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDlSVFBZRDM3In0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-7-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-8"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-1254797-0185840&amp;lineItemId=rlkinqqrqjovwny&amp;shipmentId=GqSKVY89N&amp;packageId=1&amp;asin=B09RTPYD37" class="a-button-text" role="button" id="a-autoid-8-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-9"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-9-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-10"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlkinqqrqjovwn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-1254797-0185840&amp;shipmentId=GqSKVY89N" class="a-button-text" role="button" id="a-autoid-10-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-11"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-11-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-12"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-1254797-0185840/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-12-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-13"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B09RTPYD37&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-13-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-1254797-0185840&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-426eb2618e06fabac2de22b5a05adff1" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-426eb2618e06fabac2de22b5a05adff1&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-426eb2618e06fabac2de22b5a05adff1">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-426eb2618e06fabac2de22b5a05adff1");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-426eb2618e06fabac2de22b5a05adff1");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                
            
            
        <script type="text/javascript">if (typeof uet === "function") { uet('cf'); }</script>
    
    
    
    
    
        
    
    
        
        
        
    
        
        
        
            
                
            
            
        <script type="text/javascript">if (typeof uet === "function") { uet('af'); }</script>
    
    
    
    
    
        
    
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 25, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $210.02
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-5702624-9335456</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 29</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B01N3MYVZM?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Graco Slimfit 3 in 1 Car Seat -Slim &amp; Comfy Design Saves Space in Your Back Seat, Darcie" src="https://m.media-amazon.com/images/I/41YG7WfGtyL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41YG7WfGtyL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B01N3MYVZM?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Graco Slimfit 3 in 1 Car Seat -Slim &amp; Comfy Design Saves Space in Your Back Seat, Darcie
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through May 29, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-14"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDFOM01ZVlpNIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-14-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-15"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-5702624-9335456&amp;lineItemId=rlkimvpllprwqny&amp;shipmentId=GhM3gKFVN&amp;packageId=1&amp;asin=B01N3MYVZM" class="a-button-text" role="button" id="a-autoid-15-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-16"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-16-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-17"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlkimvpllprwqn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-5702624-9335456&amp;shipmentId=GhM3gKFVN" class="a-button-text" role="button" id="a-autoid-17-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-18"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-18-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-19"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-5702624-9335456/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-19-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-20"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B01N3MYVZM&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-20-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 29</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B01FLACUUQ?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Radio Flyer Scoot 2 Scooter, Toddler Scooter or Ride On, For Ages 1-4, Red Ride On Toy, Large" src="https://m.media-amazon.com/images/I/41-9yYImKQL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41-9yYImKQL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B01FLACUUQ?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Radio Flyer Scoot 2 Scooter, Toddler Scooter or Ride On, For Ages 1-4, Red Ride On Toy, Large
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 30, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-21"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDFGTEFDVVVRIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-21-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-22"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-5702624-9335456&amp;lineItemId=rlkimvpllprvsny&amp;shipmentId=GqMhm1FNN&amp;packageId=1&amp;asin=B01FLACUUQ" class="a-button-text" role="button" id="a-autoid-22-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-23"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-23-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-24"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlkimvpllprvsn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-5702624-9335456&amp;shipmentId=GqMhm1FNN" class="a-button-text" role="button" id="a-autoid-24-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-25"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-25-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-26"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-5702624-9335456/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-26-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-27"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B01FLACUUQ&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-27-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 29</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B0828MJ517?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Green Toys Dump Truck, Pink/Purple CB - Pretend Play, Motor Skills, Kids Toy Vehicle. No BPA, phthalates, PVC. Dishwasher Safe, Recycled Plastic, Made in USA." src="https://m.media-amazon.com/images/I/41vBXjQfcEL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41vBXjQfcEL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B0828MJ517?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Green Toys Dump Truck, Pink/Purple CB - Pretend Play, Motor Skills, Kids Toy Vehicle. No BPA, phthalates, PVC. Dishwasher Safe, Recycled Plastic, Made in USA.
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 30, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-28"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDgyOE1KNTE3In0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-28-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-29"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-5702624-9335456&amp;lineItemId=rlkimvpllprvony&amp;shipmentId=Gk8KxJ8CN&amp;packageId=1&amp;asin=B0828MJ517" class="a-button-text" role="button" id="a-autoid-29-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-30"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-30-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-31"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlkimvpllprvon&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-5702624-9335456&amp;shipmentId=Gk8KxJ8CN" class="a-button-text" role="button" id="a-autoid-31-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-32"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-32-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-33"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-5702624-9335456/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-33-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-34"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B0828MJ517&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-34-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-5702624-9335456&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-65c5f08479f4d41d69ac3a4badf48a8f");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 25, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $85.16
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-af77c5a988b78c4f361c83ff635e88e8">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-af77c5a988b78c4f361c83ff635e88e8&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-af77c5a988b78c4f361c83ff635e88e8">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-5306521-2194662</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 29</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B07CG5S2YB?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Step2 Big Builders Pro Kids Workbench – Includes 45 Toy Workbench Accessories, Interactive Features for Realistic Pretend Play – Indoor/Outdoor Kids Tool Bench – Dimensions 34&quot; H x 38.5&quot; W x 27.5&quot; D" src="https://m.media-amazon.com/images/I/51CaoUsg+ZL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/51CaoUsg+ZL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B07CG5S2YB?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Step2 Big Builders Pro Kids Workbench – Includes 45 Toy Workbench Accessories, Interactive Features for Realistic Pretend Play – Indoor/Outdoor Kids Tool Bench – Dimensions 34" H x 38.5" W x 27.5" D
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 30, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-35"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDdDRzVTMllCIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-35-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-36"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-5306521-2194662&amp;lineItemId=rlkimvpllprvwny&amp;shipmentId=Qhd1rDZzw&amp;packageId=1&amp;asin=B07CG5S2YB" class="a-button-text" role="button" id="a-autoid-36-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-37"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-37-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-38"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rlkimvpllprvwn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-5306521-2194662&amp;shipmentId=Qhd1rDZzw" class="a-button-text" role="button" id="a-autoid-38-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-39"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-39-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-40"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-5306521-2194662/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-40-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-41"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B07CG5S2YB&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-41-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-5306521-2194662&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-af77c5a988b78c4f361c83ff635e88e8" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-af77c5a988b78c4f361c83ff635e88e8&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-af77c5a988b78c4f361c83ff635e88e8">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-af77c5a988b78c4f361c83ff635e88e8");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-af77c5a988b78c4f361c83ff635e88e8");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 24, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $68.46
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-e1acd0b81d235dbdd6c42e364c703a47">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-e1acd0b81d235dbdd6c42e364c703a47&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-e1acd0b81d235dbdd6c42e364c703a47">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-4246416-3181039</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 27</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B00GQIM9KO?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Asvel 7509 Rice Container Bin with Pour Spout Plastic Clear 2KG" src="https://m.media-amazon.com/images/I/411mzZd+35L._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/411mzZd+35L._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B00GQIM9KO?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Asvel 7509 Rice Container Bin with Pour Spout Plastic Clear 2KG
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 28, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-42"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDBHUUlNOUtPIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-42-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-43"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-4246416-3181039&amp;lineItemId=rljklwpqkmsoqny&amp;shipmentId=GxsfJJ6KN&amp;packageId=1&amp;asin=B00GQIM9KO" class="a-button-text" role="button" id="a-autoid-43-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-44"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-44-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-45"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rljklwpqkmsoqn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-4246416-3181039&amp;shipmentId=GxsfJJ6KN" class="a-button-text" role="button" id="a-autoid-45-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-46"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-46-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-47"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-4246416-3181039/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-47-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-48"><span class="a-button-inner"><a href="/gp/help/contact/contact.html?marketplaceId=ATVPDKIKX0DER&amp;ref=ppx_yo2ov_dt_b_prod_question&amp;assistanceType=order&amp;orderId=113-4246416-3181039&amp;subject=2&amp;recipientId=A2KG52GWU53S2M&amp;step=submitEntry" class="a-button-text" role="button" id="a-autoid-48-announce">
                Get help
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-49"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B00GQIM9KO&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-49-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 27</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B07W3792QJ?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Aroma Professional ARC-1230B Grain, Oatmeal,Slow Cooker, Saute, Steam, Timer, 10 Cup Uncooked/20 Cup Cooked, Black" src="https://m.media-amazon.com/images/I/41oU8WEeY-L._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41oU8WEeY-L._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B07W3792QJ?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Aroma Professional ARC-1230B Grain, Oatmeal,Slow Cooker, Saute, Steam, Timer, 10 Cup Uncooked/20 Cup Cooked, Black
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 28, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-50"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDdXMzc5MlFKIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-50-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-51"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-4246416-3181039&amp;lineItemId=rljklwpqkmsouny&amp;shipmentId=G7DMklQHN&amp;packageId=1&amp;asin=B07W3792QJ" class="a-button-text" role="button" id="a-autoid-51-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-52"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-52-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-53"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rljklwpqkmsoun&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-4246416-3181039&amp;shipmentId=G7DMklQHN" class="a-button-text" role="button" id="a-autoid-53-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-54"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-54-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-55"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-4246416-3181039/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-55-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-56"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B07W3792QJ&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-56-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-4246416-3181039&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-e1acd0b81d235dbdd6c42e364c703a47" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-e1acd0b81d235dbdd6c42e364c703a47&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-e1acd0b81d235dbdd6c42e364c703a47">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-e1acd0b81d235dbdd6c42e364c703a47");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-e1acd0b81d235dbdd6c42e364c703a47");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 22, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $6.41
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-25a8422996ed201e76a255403a582382">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-25a8422996ed201e76a255403a582382&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-25a8422996ed201e76a255403a582382">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-7473453-1032239</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-7473453-1032239&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-7473453-1032239&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 23</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B001U2NLIA?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Parker Labs Aquasonic Clear Ultrasound Gel, 60g Tube, Each" src="https://m.media-amazon.com/images/I/41BNQ6VMbeL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41BNQ6VMbeL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B001U2NLIA?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Parker Labs Aquasonic Clear Ultrasound Gel, 60g Tube, Each
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 24, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-57"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDAxVTJOTElBIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-57-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-58"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-7473453-1032239&amp;lineItemId=rkskouhnoqtrsny&amp;shipmentId=G7nmyv0lN&amp;packageId=1&amp;asin=B001U2NLIA" class="a-button-text" role="button" id="a-autoid-58-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-59"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rkskouhnoqtrsn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-7473453-1032239&amp;shipmentId=G7nmyv0lN" class="a-button-text" role="button" id="a-autoid-59-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-60"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-7473453-1032239&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-60-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-61"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-7473453-1032239/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-61-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-62"><span class="a-button-inner"><a href="/gp/help/contact/contact.html?marketplaceId=ATVPDKIKX0DER&amp;ref=ppx_yo2ov_dt_b_prod_question&amp;assistanceType=order&amp;orderId=113-7473453-1032239&amp;subject=2&amp;recipientId=A37V9JL51B6OHT&amp;step=submitEntry" class="a-button-text" role="button" id="a-autoid-62-announce">
                Get help
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-63"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B001U2NLIA&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-63-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-7473453-1032239&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-7473453-1032239&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-25a8422996ed201e76a255403a582382" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-25a8422996ed201e76a255403a582382&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-25a8422996ed201e76a255403a582382">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-25a8422996ed201e76a255403a582382");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-25a8422996ed201e76a255403a582382");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 22, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $13.89
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-8733380-7753007</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 23</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B09GRL3VCN?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="TP-Link USB to Ethernet Adapter (UE306), Foldable USB 3.0 to Gigabit Ethernet LAN Laptop Network Adapter, Supports Nintendo Switch, Windows, Linux, Apple MacBook OS 10.11- OS 12, Surface" src="https://m.media-amazon.com/images/I/312P22tF1RL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/312P22tF1RL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B09GRL3VCN?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            TP-Link USB to Ethernet Adapter (UE306), Foldable USB 3.0 to Gigabit Ethernet LAN Laptop Network Adapter, Supports Nintendo Switch, Windows, Linux, Apple MacBook OS 10.11- OS 12, Surface
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 24, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-64"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDlHUkwzVkNOIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-64-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-65"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-8733380-7753007&amp;lineItemId=rkshnuptqostwny&amp;shipmentId=G7jHdvrnN&amp;packageId=1&amp;asin=B09GRL3VCN" class="a-button-text" role="button" id="a-autoid-65-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-66"><span class="a-button-inner"><a href="/ps/product-support/order?orderId=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_prod_support" class="a-button-text" role="button" id="a-autoid-66-announce">
                Get product support
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-67"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rkshnuptqostwn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-8733380-7753007&amp;shipmentId=G7jHdvrnN" class="a-button-text" role="button" id="a-autoid-67-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-68"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-68-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-69"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-8733380-7753007/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-69-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-70"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B09GRL3VCN&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-70-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-8733380-7753007&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-db27e00d9245e24e10c6e5a1edff2a9b");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 20, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $9.62
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-e04aece44f9b8e9878f1c939d5a6d150">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-e04aece44f9b8e9878f1c939d5a6d150&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-e04aece44f9b8e9878f1c939d5a6d150">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-0776789-5706639</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-0776789-5706639&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-0776789-5706639&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 22</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B08FRH5W34?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="30 Pieces RGB LED Strip Connector Full Kit, 4 Pin 10 mm Gapless Solderless Adapter Extension Compatible with SMD 5050 LED Strip, 20 Gapless Connectors, 5 L Connectors and 5 T Connectors" src="https://m.media-amazon.com/images/I/41mi6G0YPhL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41mi6G0YPhL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B08FRH5W34?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            30 Pieces RGB LED Strip Connector Full Kit, 4 Pin 10 mm Gapless Solderless Adapter Extension Compatible with SMD 5050 LED Strip, 20 Gapless Connectors, 5 L Connectors and 5 T Connectors
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 23, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-71"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDhGUkg1VzM0In0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-71-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-72"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-0776789-5706639&amp;lineItemId=rkqpqvhurjkuqny&amp;shipmentId=GvflbZR8N&amp;packageId=1&amp;asin=B08FRH5W34" class="a-button-text" role="button" id="a-autoid-72-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-73"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rkqpqvhurjkuqn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-0776789-5706639&amp;shipmentId=GvflbZR8N" class="a-button-text" role="button" id="a-autoid-73-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-74"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-0776789-5706639&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-74-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-75"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-0776789-5706639/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-75-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-76"><span class="a-button-inner"><a href="/gp/help/contact/contact.html?marketplaceId=ATVPDKIKX0DER&amp;ref=ppx_yo2ov_dt_b_prod_question&amp;assistanceType=order&amp;orderId=113-0776789-5706639&amp;subject=2&amp;recipientId=A1LH3PXFGDEII4&amp;step=submitEntry" class="a-button-text" role="button" id="a-autoid-76-announce">
                Get help
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-77"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B08FRH5W34&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-77-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-0776789-5706639&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-0776789-5706639&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-e04aece44f9b8e9878f1c939d5a6d150" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-e04aece44f9b8e9878f1c939d5a6d150&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-e04aece44f9b8e9878f1c939d5a6d150">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-e04aece44f9b8e9878f1c939d5a6d150");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-e04aece44f9b8e9878f1c939d5a6d150");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 20, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $10.69
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-3667af82b75263456a1b1fe6e68e9c1c">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-3667af82b75263456a1b1fe6e68e9c1c&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-3667af82b75263456a1b1fe6e68e9c1c">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-3392153-1608202</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-3392153-1608202&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-3392153-1608202&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 22</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B0932M1666?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="Tenmiro Led Lights for Bedroom 100ft (2 Rolls of 50ft) Music Sync Color Changing Strip Lights with Remote and App Control RGB Strip, for Room Home Party Decoration" src="https://m.media-amazon.com/images/I/51i6YjrXxJL._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/51i6YjrXxJL._SS284_.jpg">
    
        </a>
    
        
            
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B0932M1666?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            Tenmiro Led Lights for Bedroom 100ft (2 Rolls of 50ft) Music Sync Color Changing Strip Lights with Remote and App Control RGB Strip, for Room Home Party Decoration
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 23, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-78"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDkzMk0xNjY2In0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-78-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-79"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-3392153-1608202&amp;lineItemId=rkqorvipppktony&amp;shipmentId=Gsf4bbR8N&amp;packageId=1&amp;asin=B0932M1666" class="a-button-text" role="button" id="a-autoid-79-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-80"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rkqorvipppkton&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-3392153-1608202&amp;shipmentId=Gsf4bbR8N" class="a-button-text" role="button" id="a-autoid-80-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-81"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-3392153-1608202&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-81-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-82"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-3392153-1608202/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-82-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-83"><span class="a-button-inner"><a href="/gp/help/contact/contact.html?marketplaceId=ATVPDKIKX0DER&amp;ref=ppx_yo2ov_dt_b_prod_question&amp;assistanceType=order&amp;orderId=113-3392153-1608202&amp;subject=2&amp;recipientId=A1RRJHAXRXF5ZH&amp;step=submitEntry" class="a-button-text" role="button" id="a-autoid-83-announce">
                Get help
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-84"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B0932M1666&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-84-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>
    
                
    
                
    
                
        <div class="a-box order-footer"><div class="a-box-inner">
            <div class="yohtmlc-order-level-connections">
                
        <span class="a-declarative" data-action="a-modal" data-a-modal="{&quot;name&quot;:&quot;archive-order-modal&quot;,&quot;header&quot;:&quot;Archive this order&quot;,&quot;url&quot;:&quot;/gp/css/order-history/archive/archiveModal.html?orderId=113-3392153-1608202&amp;ref=ppx_yo2ov_dt_b_archive_order&quot;}">
            
        <a class="a-link-normal" href="/gp/css/order-history/archive/archiveModal.html?orderId=113-3392153-1608202&amp;ref=ppx_yo2ov_dt_b_archive_order">
            Archive order
        </a>
    
        </span>
    
            </div>
        </div></div>
    
            
    
    
            
    
    
    <script id="shipToData-shippingAddress-3667af82b75263456a1b1fe6e68e9c1c" type="text/template">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-3667af82b75263456a1b1fe6e68e9c1c&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-3667af82b75263456a1b1fe6e68e9c1c">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </script>
    
    <script>
        var insertionNode = document.getElementById("shipToInsertionNode-" + "shippingAddress-3667af82b75263456a1b1fe6e68e9c1c");
        if (insertionNode !== null) {
            var encryptedDataNode = document.getElementById("shipToData-" + "shippingAddress-3667af82b75263456a1b1fe6e68e9c1c");
            insertionNode.innerHTML = encryptedDataNode.innerHTML;
        }
    </script>
    
        </div>
    </div>
    
        
        
        
    
        
        
        
            
                <script>ue.count("OrdersView.OrderCardRendered", 1);</script>
            
            <div class="order-card js-order-card">
        
        <div class="a-box-group a-spacing-base">
            
    
    
                <div class="a-box a-color-offset-background order-header"><div class="a-box-inner">
    
        <div class="a-fixed-right-grid"><div class="a-fixed-right-grid-inner" style="padding-right:290px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:0%;float:left;">
                <div class="a-row">
                    <div class="a-column a-span3">
                        <div class="a-row a-size-mini">
                            <span class="a-color-secondary a-text-caps">Order placed</span>
                        </div>
                        <div class="a-row">
                            <span class="a-size-base a-color-secondary">February 20, 2024</span>
                        </div>
                    </div>
                    
                        <div class="a-column a-span2">
                            <div class="a-row a-size-mini">
                                <span class="a-color-secondary a-text-caps">
                                    Total
                                </span>
                            </div>
                            <div class="a-row">
                                <span class="a-size-base a-color-secondary">
                                    <div class="yohtmlc-order-total">
                                        $64.16
                                    </div>
                                </span>
                            </div>
                        </div>
                    
                    
                        <div class="a-column a-span7 a-span-last">
                            <div class="yohtmlc-recipient">
                                <div class="a-row a-size-mini">
        <span class="a-color-secondary a-text-caps">Ship to</span>
    </div>
    <div class="a-row a-size-base">
        
            <div id="shipToInsertionNode-shippingAddress-b4521cfdd9d092e59a17e9ddd94c3706">
        <span class="a-declarative" data-action="a-popover" data-a-popover="{&quot;name&quot;:&quot;shippingAddress-b4521cfdd9d092e59a17e9ddd94c3706&quot;,&quot;position&quot;:&quot;triggerBottom&quot;,&quot;closeButton&quot;:false,&quot;width&quot;:&quot;250&quot;,&quot;popoverLabel&quot;:&quot;Recipient address&quot;,&quot;closeButtonLabel&quot;:&quot;Close recipient address&quot;}">
            <a href="javascript:void(0)" class="a-popover-trigger a-declarative insert-encrypted-trigger-text">
                Kevin Villela
            <i class="a-icon a-icon-popover"></i></a>
        </span>
    
        
            <div class="a-popover-preload" id="a-popover-shippingAddress-b4521cfdd9d092e59a17e9ddd94c3706">
                <span class="a-color-base">
                    <div class="a-row">
                        <span class="a-text-bold">
                            Kevin Villela
                        </span>
                    </div>
                    
                        <div class="a-row">
                            69595 PRIMROSE RD<br>WALKERTON, IN 46574-8703
                        </div>
                    
                        <div class="a-row">
                            United States
                        </div>
                    
    
                    
                </span>
            </div>
        
    </div>
        
    </div>
                            </div>
                        </div>
                    
               </div>
            </div>
            <div class="a-text-right a-fixed-right-grid-col a-col-right" style="width:290px;margin-right:-290px;float:left;">
                <div class="a-row a-size-mini">
                    <div class="yohtmlc-order-id">
                        <span class="a-color-secondary a-text-caps">Order #</span>
                        <span class="a-color-secondary" dir="ltr">113-9161126-2786613</span>
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-order-level-connections">
                        
        
        <a class="a-link-normal" href="/gp/css/order-details?orderID=113-9161126-2786613&amp;ref=ppx_yo2ov_dt_b_fed_order_details">
            View order details
        </a>
    
    
                        
                            <i class="a-icon a-icon-text-separator" role="img"></i>
                            
        
        
        <a class="a-link-normal" href="/gp/css/summary/print.html?orderID=113-9161126-2786613&amp;ref=ppx_yo2ov_dt_b_invoice">
            View invoice
        </a>
    
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    
    </div></div>
    
    
                
                    <div class="a-box delivery-box"><div class="a-box-inner">
        <div class="a-fixed-right-grid a-spacing-small"><div class="a-fixed-right-grid-inner" style="padding-right:220px">
            <div class="a-fixed-right-grid-col a-col-left" style="padding-right:3.2%;float:left;">
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-primaryText">
                        
    
    
        <span class="a-size-medium delivery-box__primary-text a-text-bold">Delivered February 22</span>
    
                    </div>
                </div>
                <div class="a-row">
                    <div class="yohtmlc-shipment-status-secondaryText">
                        
    
    
        <span class="delivery-box__secondary-text">Your package was left near the front door or porch.</span>
    
                    </div>
                    
    
                </div>
                <div class="a-row a-spacing-top-base">
                    
                        
                            <div class="a-fixed-left-grid item-box a-spacing-none"><div class="a-fixed-left-grid-inner" style="padding-left:100px">
        <div class="a-fixed-left-grid-col a-col-left" style="width:100px;margin-left:-100px;float:left;">
            <div class="product-image">
        <a class="a-link-normal" tabindex="-1" href="/dp/B0948L7Z5W?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
            
        <img alt="GE CYNC Smart Plug, Indoor Bluetooth and Wi-Fi Outlet Socket, Works with Alexa and Google (1 Pack)" src="https://m.media-amazon.com/images/I/41IfYRB7Q6L._SS142_.jpg" data-a-hires="https://m.media-amazon.com/images/I/41IfYRB7Q6L._SS284_.jpg">
    
        </a>
    
        
            <span class="product-image__qty">
        4
    </span>
        
    </div>
        </div>
        <div class="a-fixed-left-grid-col a-col-right" style="padding-left:0%;float:left;">
            <div class="a-row">
                
                    <a class="a-link-normal" href="/dp/B0948L7Z5W?psc=1&amp;ref=ppx_yo2ov_dt_b_product_details">
                        <div class="yohtmlc-product-title">
                            GE CYNC Smart Plug, Indoor Bluetooth and Wi-Fi Outlet Socket, Works with Alexa and Google (1 Pack)
                        </div>
                    </a>
                
            </div>
            <div class="a-row a-size-small a-color-secondary">
                <span></span>
    
        
    
    
                
            </div>
            
                <div class="a-row">
                    
                        <span class="a-size-small">
                            Return or replace items: Eligible through March 23, 2024
                        </span>
                    
                </div>
            
            
            <div class="a-row a-spacing-top-mini">
                <div class="yohtmlc-item-level-connections">
                    
                        
        
            
    
        <span class="a-button a-button-normal a-spacing-mini a-button-primary" id="a-autoid-85"><span class="a-button-inner"><a href="/gp/buyagain?ats=eyJjdXN0b21lcklkIjoiQTFJV09LNzdXSlpXVlIiLCJleHBsaWNpdENhbmRpZGF0ZXMiOiJCMDk0OEw3WjVXIn0%3D&amp;ref=ppx_yo2ov_dt_b_bia_item" class="a-button-text" role="button" id="a-autoid-85-announce">
            <div class="buy-it-again-button__icon"></div>
            <div class="reorder-modal-trigger-text">Buy it again</div>
        </a></span></span>
    
    
        
    
    
                    
                        
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-86"><span class="a-button-inner"><a href="/your-orders/pop?ref=ppx_yo2ov_dt_b_pop&amp;orderId=113-9161126-2786613&amp;lineItemId=rkrhsplqljppsny&amp;shipmentId=GttkFGRxN&amp;packageId=1&amp;asin=B0948L7Z5W" class="a-button-text" role="button" id="a-autoid-86-announce">
                View your item
            </a></span></span>
        
    
    
                    
                </div>
            </div>
        </div>
    </div></div>
    
    
                        
                    
                </div>
            </div>
            <div class="a-fixed-right-grid-col a-col-right" style="width:220px;margin-right:-220px;float:left;">
                <div class="a-button-stack a-spacing-mini">
                    <div class="yohtmlc-shipment-level-connections">
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-87"><span class="a-button-inner"><a href="/gp/your-account/ship-track?itemId=rkrhsplqljppsn&amp;ref=ppx_yo2ov_dt_b_track_package&amp;packageIndex=0&amp;orderId=113-9161126-2786613&amp;shipmentId=GttkFGRxN" class="a-button-text" role="button" id="a-autoid-87-announce">
                Track package
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-88"><span class="a-button-inner"><a href="/spr/returns/cart?orderId=113-9161126-2786613&amp;ref=ppx_yo2ov_dt_b_return_replace" class="a-button-text" role="button" id="a-autoid-88-announce">
                Return or replace items
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-89"><span class="a-button-inner"><a href="/gcx/-/ty/gr/113-9161126-2786613/shipment?ref=ppx_yo2ov_dt_b_gift_receipt" class="a-button-text" role="button" id="a-autoid-89-announce">
                Share gift receipt
            </a></span></span>
        
    
    
                        
                            
        
            <span class="a-button a-button-normal a-spacing-mini a-button-base" id="a-autoid-90"><span class="a-button-inner"><a href="/review/review-your-purchases?asins=B0948L7Z5W&amp;channel=YAcc-wr&amp;ref=ppx_yo2ov_dt_b_rev_prod" class="a-button-text" role="button" id="a-autoid-90-announce">
                Write a product review
            </a></span></span>
        
    
    
                        
                    </div>
                </div>
            </div>
        </div></div>
    </div></div>`

    expect(parseOrders(webPage)).toStrictEqual([
      {
        orderNumber: '113-2940723-0981046',
        itemNames: [
          'Carlson - Elite Omega-3 Gems, 1600 mg Omega-3 Fatty Acids Including EPA and DHA, Norwegian Fish Oil Supplement, Wild Caught, Sustainably Sourced Capsules, Lemon, 90+30 Softgels'
        ]
      },
      {
        orderNumber: '113-1254797-0185840',
        itemNames: [
          'Nuby Clik-It Soft Spout No-Spill Easy Grip Sippy Cup for Girls - (3-Pack) 10 Oz - 6+ Months'
        ]
      },
      {
        orderNumber: '113-5702624-9335456',
        itemNames: [
          'Graco Slimfit 3 in 1 Car Seat -Slim & Comfy Design Saves Space in Your Back Seat, Darcie',
          'Radio Flyer Scoot 2 Scooter, Toddler Scooter or Ride On, For Ages 1-4, Red Ride On Toy, Large',
          'Green Toys Dump Truck, Pink/Purple CB - Pretend Play, Motor Skills, Kids Toy Vehicle. No BPA, phthalates, PVC. Dishwasher Safe, Recycled Plastic, Made in USA.'
        ]
      },
      {
        orderNumber: '113-5306521-2194662',
        itemNames: [
          'Step2 Big Builders Pro Kids Workbench – Includes 45 Toy Workbench Accessories, Interactive Features for Realistic Pretend Play – Indoor/Outdoor Kids Tool Bench – Dimensions 34" H x 38.5" W x 27.5" D'
        ]
      },
      {
        orderNumber: '113-4246416-3181039',
        itemNames: [
          'Asvel 7509 Rice Container Bin with Pour Spout Plastic Clear 2KG',
          'Aroma Professional ARC-1230B Grain, Oatmeal,Slow Cooker, Saute, Steam, Timer, 10 Cup Uncooked/20 Cup Cooked, Black'
        ]
      },
      {
        orderNumber: '113-7473453-1032239',
        itemNames: ['Parker Labs Aquasonic Clear Ultrasound Gel, 60g Tube, Each']
      },
      {
        orderNumber: '113-8733380-7753007',
        itemNames: [
          'TP-Link USB to Ethernet Adapter (UE306), Foldable USB 3.0 to Gigabit Ethernet LAN Laptop Network Adapter, Supports Nintendo Switch, Windows, Linux, Apple MacBook OS 10.11- OS 12, Surface'
        ]
      },
      {
        orderNumber: '113-0776789-5706639',
        itemNames: [
          '30 Pieces RGB LED Strip Connector Full Kit, 4 Pin 10 mm Gapless Solderless Adapter Extension Compatible with SMD 5050 LED Strip, 20 Gapless Connectors, 5 L Connectors and 5 T Connectors'
        ]
      },
      {
        orderNumber: '113-3392153-1608202',
        itemNames: [
          'Tenmiro Led Lights for Bedroom 100ft (2 Rolls of 50ft) Music Sync Color Changing Strip Lights with Remote and App Control RGB Strip, for Room Home Party Decoration'
        ]
      },
      {
        orderNumber: '113-9161126-2786613',
        itemNames: [
          'GE CYNC Smart Plug, Indoor Bluetooth and Wi-Fi Outlet Socket, Works with Alexa and Google (1 Pack)'
        ]
      }
    ]);
  });
});