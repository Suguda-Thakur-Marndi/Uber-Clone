import React from 'react';

const Finishride = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">Ride completed</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Finish Ride</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Review your trip summary, confirm payment, and leave a quick rating for your driver.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">Trip summary</h2>
                <p className="mt-1 text-sm text-slate-400">Complete details of your finished ride</p>
              </div>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
                Paid
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">From</p>
                <p className="mt-2 font-medium">Connaught Place</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">To</p>
                <p className="mt-2 font-medium">Indira Gandhi International Airport</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Distance</p>
                <p className="mt-2 font-medium">18.4 km</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-400">Duration</p>
                <p className="mt-2 font-medium">42 min</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-slate-800 to-slate-700 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-300">Fare summary</p>
                  <p className="mt-1 text-3xl font-bold">₹ 680</p>
                </div>
                <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-200">
                  View receipt
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 rounded-3xl border border-white/10 bg-white p-6 text-slate-900 shadow-xl">
            <div>
              <h2 className="text-lg font-semibold">Driver rating</h2>
              <p className="mt-1 text-sm text-slate-500">Share your experience to help improve rides.</p>
            </div>

            <div className="flex items-center gap-2 text-2xl text-amber-400">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span className="text-slate-300">★</span>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-slate-700">Leave a comment</label>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                placeholder="Your driver was polite and the ride was smooth..."
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Submit rating
              </button>
              <button className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Book again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finishride;