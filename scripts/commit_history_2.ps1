git add src/app/\(protected\)/\(customer\)/dashboard/tracking
git commit -m "feat: add customer shipment tracking view"

git add src/app/\(protected\)/\(customer\)/dashboard/payments
git commit -m "feat: add customer payment history"

git add src/app/\(protected\)/notifications src/app/\(protected\)/profile
git commit -m "feat: add notifications and profile views"

git add src/app/payment/cancel src/app/api/health
git commit -m "feat: add payment cancel UX and API health endpoint"

git add src/components/admin src/components/feedback src/components/public src/components/shipments
git commit -m "feat: add specialized UI components for domain areas"

git add src/lib/constants.ts src/lib/constants src/lib/query-keys.ts src/lib/store src/lib/utils.ts src/types
git commit -m "chore: finalize application constants and global utilities"

git add .
git commit -m "chore: final project adjustments"
