import t2023 from '../images/2023.webp';
import t2024 from '../images/2024.webp';
import t2025 from '../images/jama-2025.webp';
import ta2025 from '../images/dayan-2025.webp';
import tb2023 from '../images/2023t.jpg';
import tb2024 from '../images/2024t.jpg';
import tb20242 from '../images/2024t2.jpg';

export default function TuskersHistory() {
  const leaders = [
    {
      year: '2023',
      captain: 'Dayan Diddeniya',
      viceCaptain: 'Arshad Jamaldeen',
      image: t2023,
      captainRole: 'Dubai 7s Captain 2023'
    },
    {
      year: '2024',
      captain: 'Dayan Diddeniya',
      viceCaptain: 'Arshad Jamaldeen',
      image: t2024,
      captainRole: 'Dubai 7s Captain 2024'
    },
    {
      year: '2025',
      captain: 'Arshad Jamaldeen',
      viceCaptain: 'Dulara Danusha',
      image: t2025,
      captainRole: 'Dubai 7s Captain 2025'
    }
  ];

  return (
    <div className="w-full overflow-hidden">

      {/* HERO SECTION */}
      <div
        className="relative py-20 px-6 md:px-16 lg:px-24 bg-[#1a1f4e]"
      >
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-extrabold" style={{ color: '#f5a623' }}>
            TUSKERS HISTORY
          </h1>
          <div className="h-1 w-32 mx-auto" style={{ backgroundColor: '#f5a623' }} />
        </div>
      </div>

      {/* STORY BLOCK */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <div
          className="rounded-3xl p-4 md:p-10 shadow-xl border-2"
          style={{ backgroundColor: '#2a2f5e', borderColor: '#f5a623' }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold flex items-center gap-3"
            style={{ color: '#f5a623' }}
          >
            The Story of Dubai Tuskers
          </h2>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 space-y-4 text-white text-lg leading-relaxed">
              <p>
                Dubai Tuskers Rugby Club was founded in{' '}
                <span className="font-semibold" style={{ color: '#f5a623' }}>2023</span> by{' '}
                <span className="font-semibold" style={{ color: '#f5a623' }}>Dayan Diddeniya</span>,
                with a vision of creating a competitive rugby team rooted in heritage, teamwork, and community pride.
              </p>
              <p>
                From humble beginnings, the Tuskers quickly grew into a respected name in UAE rugby,
                built through leadership, commitment, and unity.
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative w-56 h-72 md:w-64 md:h-80">
                <img
                  src={ta2025}
                  alt="Dayan"
                  className="w-full h-full object-cover rounded-2xl border-4"
                  style={{ borderColor: '#f5a623' }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 md:p-4 rounded-b-2xl"
                  style={{ backgroundColor: 'rgba(26,31,78,0.95)' }}
                >
                  <p className="font-bold text-center" style={{ color: '#f5a623' }}>Dayan Diddeniya</p>
                  <p className="text-white text-sm text-center">Founder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="py-10 px-2 md:px-16 lg:px-24 bg-[#1a1f4e]"
      >
        <div className="space-y-16">

          {/* 2023 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="px-6 py-3 rounded-full font-bold text-xl md:text-2xl shadow-lg"
                style={{ backgroundColor: '#f5a623', color: '#1a1f4e' }}
              >
                2023
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold"
                style={{ color: '#f5a623' }}
              >
                A Historic Debut
              </h3>
            </div>

            <div
              className="p-2 md:p-8 md:border-2 space-y-6"
              style={{ backgroundColor: '#2a2f5e', borderColor: '#f5a623' }}
            >
              <p className="text-white text-lg p-2">
                Dubai Tuskers made history as the first Sri Lankan alumni side to compete at the
                Emirates Dubai Rugby Sevens.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Captain</p>
                  <p className="text-white text-2xl font-semibold">Dayan Diddeniya</p>
                </div>

                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Vice Captain</p>
                  <p className="text-white text-2xl font-semibold">Arshad Jamaldeen</p>
                </div>
              </div>

              <img
                src={tb2023}
                className="w-full object-cover border-2 shadow-lg"
                style={{ borderColor: '#f5a623' }}
              />
            </div>
          </div>

          {/* 2024 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="px-6 py-3 rounded-full font-bold text-xl md:text-2xl shadow-lg flex items-center gap-2"
                style={{ backgroundColor: '#f5a623', color: '#1a1f4e' }}
              >
                2024
              </div>
              <h3 className="text-3xl font-bold" style={{ color: '#f5a623' }}>
                Our First Trophy
              </h3>
            </div>

            <div
              className="p-2 md:p-8 md:border-2 space-y-6"
              style={{ backgroundColor: '#2a2f5e', borderColor: '#f5a623' }}
            >
              <p className="text-white text-lg p-2">
                The Tuskers lifted their first-ever trophy: the{' '}
                <span style={{ color: '#f5a623' }}>Gulf Men's Social Plate Final</span>.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Captain</p>
                  <p className="text-white text-2xl font-semibold">Dayan Diddeniya</p>
                </div>

                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Vice Captain</p>
                  <p className="text-white text-2xl font-semibold">Arshad Jamaldeen</p>
                </div>
              </div>

              <img
                src={tb2024}
                className="w-full object-cover border-2 shadow-lg"
                style={{ borderColor: '#f5a623' }}
              />

              <img
                src={tb20242}
                className="w-full object-cover border-2 shadow-lg"
                style={{ borderColor: '#f5a623' }}
              />
            </div>
          </div>

          {/* 2025 */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="px-6 py-3 rounded-full font-bold text-xl md:text-2xl shadow-lg"
                style={{ backgroundColor: '#f5a623', color: '#1a1f4e' }}
              >
                2025
              </div>
              <h3 className="text-3xl font-bold" style={{ color: '#f5a623' }}>
                A New Chapter
              </h3>
            </div>

            <div
              className="p-6 md:p-8 border-2 space-y-6"
              style={{ backgroundColor: '#2a2f5e', borderColor: '#f5a623' }}
            >
              <p className="text-white text-lg">
                The Tuskers step forward into new leagues and ambitions.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Captain</p>
                  <p className="text-white text-2xl font-semibold">Arshad Jamaldeen</p>
                </div>

                <div
                  className="border-2 rounded-xl p-6 bg-white/5"
                  style={{ borderColor: '#f5a623' }}
                >
                  <p className="font-bold text-xl mb-2" style={{ color: '#f5a623' }}>Vice Captain</p>
                  <p className="text-white text-2xl font-semibold">Dulara Danusha</p>
                </div>
              </div>

              <img
                src={"https://qasvqrglwupcdqosogac.supabase.co/storage/v1/object/public/posts/2025-banner.webp"}
                className="w-full object-cover border-2 shadow-lg"
                style={{ borderColor: '#f5a623' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* LEADERS SECTION */}
      <div className="py-16 px-6 md:px-16 lg:px-24 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1a1f4e' }}>
            Leadership Legends
          </h2>
          <p className="text-xl" style={{ color: '#2a2f5e' }}>Emirates Dubai Rugby 7s</p>
          <div className="h-1 w-32 mx-auto mt-6" style={{ backgroundColor: '#f5a623' }} />
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-8 mx-10">
          {leaders.map((leader, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden border-2"
              style={{ backgroundColor: '#2a2f5e', borderColor: '#f5a623' }}
            >
              <img
                src={leader.image}
                alt={leader.captain}
                className="w-full h-[24em] md:h-[40em] object-cover"
              />
              <div className="p-6 space-y-2">
                <div
                  className="px-3 py-1 rounded-full font-bold text-sm inline-block"
                  style={{ backgroundColor: '#f5a623', color: '#1a1f4e' }}
                >
                  {leader.year}
                </div>
                <h3 className="font-bold text-2xl" style={{ color: '#f5a623' }}>{leader.captain}</h3>
                <p className="text-white text-lg">{leader.captainRole}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden border-2" style={{ borderColor: '#f5a623' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#f5a623' }}>
                <tr>
                  <th className="px-6 py-4 text-left font-bold text-lg" style={{ color: '#1a1f4e' }}>YEAR</th>
                  <th className="px-6 py-4 text-left font-bold text-lg" style={{ color: '#1a1f4e' }}>CAPTAIN</th>
                  <th className="px-6 py-4 text-left font-bold text-lg" style={{ color: '#1a1f4e' }}>VICE CAPTAIN</th>
                </tr>
              </thead>

              <tbody style={{ backgroundColor: '#2a2f5e' }}>
                {leaders.map((leader, idx) => (
                  <tr key={idx} className="border-b" style={{ borderColor: '#f5a623' }}>
                    <td className="px-6 py-4 font-bold text-xl" style={{ color: '#f5a623' }}>{leader.year}</td>
                    <td className="px-6 py-4 text-white text-lg">{leader.captain}</td>
                    <td className="px-6 py-4 text-white text-lg">{leader.viceCaptain}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
