"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { SearchBar } from "../../components/SearchBar";
import { HomeContent } from "../../components/HomeContent";

type ModalType = "post" | null;
type MainView = "home" | "communities" | "channels" | "groups" | "communityDetail" | "channelDetail" | "groupDetail";
type DetailKind = "community" | "channel" | "group";
type DetailTab = "members" | "posts" | "chat" | "announcements";

type CommunityItem = {
  id: number;
  name: string;
  description: string;
  members: number;
  joined: boolean;
  category: string;
  membersList: Array<{ name: string; role: string }>;
  detailPosts: Array<{
    id: number;
    title: string;
    author: string;
    role: string;
    content: string;
    time: string;
  }>;
  chatHistory: Array<{
    id: number;
    sender: string;
    role: string;
    message: string;
    time: string;
    attachment?: string;
  }>;
  announcements: Array<{
    id: number;
    title: string;
    detail: string;
    time: string;
  }>;
};

type PostItem = {
  id: number;
  author: string;
  role: string;
  title: string;
  content: string;
  type: "friend" | "community" | "channel" | "group";
  community?: string;
  time: string;
  imageUrls?: string[];
};

const initialCommunities: CommunityItem[] = [
  {
    id: 1,
    name: "Product Builders",
    description: "Designers and PMs sharing launch updates and resources.",
    members: 1870,
    joined: true,
    category: "Growth",
    membersList: [
      { name: "Ava Chen", role: "Design Lead" },
      { name: "Noah Brooks", role: "Product Manager" },
      { name: "Lina Gomez", role: "Community Strategist" },
      { name: "Kai Patel", role: "Operations Lead" },
    ],
    detailPosts: [
      { id: 11, title: "Launch checklist shared", author: "Ava Chen", role: "Design Lead", content: "We reviewed the launch checklist and polished the handoff notes for the team.", time: "1h ago" },
      { id: 12, title: "Resources for new collaborators", author: "Noah Brooks", role: "Product Manager", content: "A short guide on how to move from idea to delivery in the next sprint.", time: "4h ago" },
    ],
    chatHistory: [
      { id: 1, sender: "Ava Chen", role: "Design Lead", message: "The launch checklist is ready for review.", time: "10m ago" },
      { id: 2, sender: "You", role: "Creator", message: "I will review it before the afternoon sync.", time: "5m ago", attachment: "Launch-plan.pdf" },
    ],
    announcements: [
      { id: 1, title: "New event: Design sprint demo", detail: "A short walkthrough will happen on Thursday at 4 PM.", time: "Today" },
    ],
  },
  {
    id: 2,
    name: "AI Studio",
    description: "Hands-on prompts, workflows, and research discussions.",
    members: 1234,
    joined: false,
    category: "Innovation",
    membersList: [
      { name: "Mina Patel", role: "AI Researcher" },
      { name: "Elliot Ford", role: "Prompt Engineer" },
      { name: "Sara Iqbal", role: "Developer Advocate" },
    ],
    detailPosts: [
      { id: 21, title: "Prompt library update", author: "Mina Patel", role: "AI Researcher", content: "The new prompt library is ready for review and feedback from the community.", time: "3h ago" },
    ],
    chatHistory: [
      { id: 3, sender: "Mina Patel", role: "AI Researcher", message: "Please share your prompt examples before the review.", time: "1h ago" },
    ],
    announcements: [
      { id: 2, title: "Community workshop", detail: "A live workshop on prompt creation is scheduled for Friday.", time: "Tomorrow" },
    ],
  },
  {
    id: 3,
    name: "Remote Leaders",
    description: "Weekly leadership playbooks and collaboration rituals.",
    members: 940,
    joined: true,
    category: "Leadership",
    membersList: [
      { name: "Rina Sol", role: "People Lead" },
      { name: "Daniel Cruz", role: "Operations Director" },
    ],
    detailPosts: [
      { id: 31, title: "Leadership sync recap", author: "Rina Sol", role: "People Lead", content: "This week’s sync focused on team rituals, decision making, and staying aligned remotely.", time: "Yesterday" },
    ],
    chatHistory: [
      { id: 4, sender: "Rina Sol", role: "People Lead", message: "Let’s keep the next meetup focused on practical leadership examples.", time: "Yesterday" },
    ],
    announcements: [
      { id: 3, title: "Leadership meetup", detail: "A virtual meetup is being planned for next week.", time: "Next week" },
    ],
  },
];

const initialChannels: CommunityItem[] = [
  {
    id: 101,
    name: "Marketing Wins",
    description: "Share campaign highlights and audience insights.",
    members: 640,
    joined: true,
    category: "Marketing",
    membersList: [
      { name: "Liam Ortiz", role: "Channel Host" },
      { name: "Tessa Green", role: "Growth Manager" },
    ],
    detailPosts: [
      { id: 1011, title: "Campaign snapshot", author: "Tessa Green", role: "Growth Manager", content: "The latest campaign drove strong engagement with a clear uplift in qualified leads.", time: "2h ago" },
    ],
    chatHistory: [
      { id: 5, sender: "Tessa Green", role: "Growth Manager", message: "The campaign data has been shared in the channel.", time: "25m ago" },
    ],
    announcements: [
      { id: 4, title: "Upcoming campaign review", detail: "A review session is scheduled for Monday at noon.", time: "Monday" },
    ],
  },
  {
    id: 102,
    name: "Ops Pulse",
    description: "Stay ahead of launch timelines and risk updates.",
    members: 422,
    joined: false,
    category: "Operations",
    membersList: [
      { name: "Jules Park", role: "Operations Lead" },
      { name: "Omar Reed", role: "Program Manager" },
    ],
    detailPosts: [
      { id: 1021, title: "Release readiness update", author: "Jules Park", role: "Operations Lead", content: "The team reviewed risks and confirmed the launch sequence for the next milestone.", time: "5h ago" },
    ],
    chatHistory: [
      { id: 6, sender: "Jules Park", role: "Operations Lead", message: "Please review the updated launch plan before Tuesday.", time: "40m ago" },
    ],
    announcements: [
      { id: 5, title: "Release milestone", detail: "The next milestone will go live on Wednesday at 9 AM.", time: "Wednesday" },
    ],
  },
];

const initialGroups: CommunityItem[] = [
  {
    id: 201,
    name: "Founders Circle",
    description: "Peer support for ambitious builders and operators.",
    members: 318,
    joined: true,
    category: "Community",
    membersList: [
      { name: "Nora Singh", role: "Group Admin" },
      { name: "Ben Flores", role: "Founder" },
      { name: "Priya Shah", role: "Operator" },
    ],
    detailPosts: [
      { id: 2011, title: "Founders meetup notes", author: "Nora Singh", role: "Group Admin", content: "We shared actionable advice on pacing growth and staying focused during busy seasons.", time: "2d ago" },
    ],
    chatHistory: [
      { id: 7, sender: "Nora Singh", role: "Group Admin", message: "The meetup notes are pinned for everyone in the group.", time: "2d ago" },
    ],
    announcements: [
      { id: 6, title: "Founder roundtable", detail: "A roundtable discussion is planned for next month.", time: "Next month" },
    ],
  },
  {
    id: 202,
    name: "Design Systems",
    description: "A space for scalable UI patterns and collaboration.",
    members: 284,
    joined: false,
    category: "Design",
    membersList: [
      { name: "Iris Lane", role: "Design Systems Lead" },
      { name: "Marcus Bell", role: "Frontend Engineer" },
    ],
    detailPosts: [
      { id: 2021, title: "Pattern library refresh", author: "Iris Lane", role: "Design Systems Lead", content: "A new pattern set is being reviewed for consistency and reuse across the product suite.", time: "3d ago" },
    ],
    chatHistory: [
      { id: 8, sender: "Iris Lane", role: "Design Systems Lead", message: "Please send your feedback on the updated pattern library.", time: "3d ago" },
    ],
    announcements: [
      { id: 7, title: "Pattern review session", detail: "A design review will happen later this week.", time: "Later this week" },
    ],
  },
];

const initialPosts: PostItem[] = [
  {
    id: 1,
    author: "Ava Chen",
    role: "Design Lead",
    title: "New onboarding flow concepts are live",
    content: "The team just shared a fresh set of ideas for onboarding and the feedback from the community has already been incredible.",
    type: "community",
    community: "Product Builders",
    time: "2h ago",
    imageUrls: ["https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"],
  },
  {
    id: 2,
    author: "Mina Patel",
    role: "Friend",
    title: "Morning sync notes from the launch squad",
    content: "A quick recap of the goals for today and the three priorities we need to execute before the event.",
    type: "friend",
    time: "5h ago",
  },
  {
    id: 3,
    author: "Liam Ortiz",
    role: "Channel Host",
    title: "Ops Pulse update",
    content: "We shared the last milestone report and a few requests for support from the wider org.",
    type: "channel",
    community: "Ops Pulse",
    time: "1d ago",
  },
  {
    id: 4,
    author: "Nora Singh",
    role: "Group Admin",
    title: "Founders Circle meetup notes",
    content: "A thoughtful recap of the lessons we learned about momentum, focus, and sustainable growth.",
    type: "group",
    community: "Founders Circle",
    time: "2d ago",
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [mainView, setMainView] = useState<MainView>("home");
  const [selectedItem, setSelectedItem] = useState<{ kind: DetailKind; id: number } | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>("members");
  const [communities, setCommunities] = useState(initialCommunities);
  const [channels, setChannels] = useState(initialChannels);
  const [groups, setGroups] = useState(initialGroups);
  const [posts, setPosts] = useState(initialPosts);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [draftImages, setDraftImages] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatAttachment, setChatAttachment] = useState("");

  const joinedCommunities = communities.filter((item) => item.joined);
  const recommendedCommunities = communities.filter((item) => !item.joined);
  const joinedChannels = channels.filter((item) => item.joined);
  const recommendedChannels = channels.filter((item) => !item.joined);
  const joinedGroups = groups.filter((item) => item.joined);
  const recommendedGroups = groups.filter((item) => !item.joined);

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    const results = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
          }),
      ),
    );

    setDraftImages((current) => [...current, ...results]);
    event.target.value = "";
  };

  const handleCreatePost = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draftTitle.trim() && !draftContent.trim()) return;

    const newPost: PostItem = {
      id: Date.now(),
      author: "You",
      role: "Creator",
      title: draftTitle.trim() || "New update",
      content: draftContent.trim() || "A fresh update from your workspace.",
      type: "friend",
      time: "just now",
      imageUrls: draftImages,
    };

    setPosts((current) => [newPost, ...current]);
    setDraftTitle("");
    setDraftContent("");
    setDraftImages([]);
    setModalType(null);
  };

  const openCollection = (view: Exclude<MainView, "home" | "communityDetail" | "channelDetail" | "groupDetail">) => {
    setMainView(view);
    setSelectedItem(null);
  };

  const openDetail = (kind: DetailKind, id: number) => {
    setSelectedItem({ kind, id });
    setDetailTab("members");
    if (kind === "community") {
      setMainView("communityDetail");
    } else if (kind === "channel") {
      setMainView("channelDetail");
    } else {
      setMainView("groupDetail");
    }
  };

  const toggleJoin = (id: number, list: "communities" | "channels" | "groups") => {
    if (list === "communities") {
      setCommunities((current) => current.map((item) => (item.id === id ? { ...item, joined: !item.joined } : item)));
      return;
    }

    if (list === "channels") {
      setChannels((current) => current.map((item) => (item.id === id ? { ...item, joined: !item.joined } : item)));
      return;
    }

    setGroups((current) => current.map((item) => (item.id === id ? { ...item, joined: !item.joined } : item)));
  };

  const handleChatSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedItem || !chatInput.trim() && !chatAttachment.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      role: "Creator",
      message: chatInput.trim() || "Shared a note",
      time: "just now",
      attachment: chatAttachment.trim() || undefined,
    };

    if (selectedItem.kind === "community") {
      setCommunities((current) => current.map((item) => (item.id === selectedItem.id ? { ...item, chatHistory: [...item.chatHistory, newMessage] } : item)));
    } else if (selectedItem.kind === "channel") {
      setChannels((current) => current.map((item) => (item.id === selectedItem.id ? { ...item, chatHistory: [...item.chatHistory, newMessage] } : item)));
    } else {
      setGroups((current) => current.map((item) => (item.id === selectedItem.id ? { ...item, chatHistory: [...item.chatHistory, newMessage] } : item)));
    }

    setChatInput("");
    setChatAttachment("");
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 ring-1 ring-slate-200 lg:hidden"
              aria-label="Open navigation"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen((current) => !current)}
            >
              <span className="flex h-5 w-5 flex-col justify-between">
                <span className="block h-0.5 w-full rounded-full bg-slate-900"></span>
                <span className="block h-0.5 w-full rounded-full bg-slate-900"></span>
                <span className="block h-0.5 w-full rounded-full bg-slate-900"></span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="flex items-center gap-3"
              aria-label="Go to home screen"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-lg font-semibold text-white">
                F
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">FusionNet</p>
                <p className="text-xs text-slate-500">Your social workspace</p>
              </div>
            </button>
          </div>

          <div className="hidden w-full max-w-xl lg:block">
            <SearchBar />
          </div>
          <div className="w-full max-w-xl lg:w-auto lg:hidden">
            <SearchBar />
          </div>

          <nav className="hidden items-center gap-3 text-sm text-slate-700 lg:flex">
            {[
              { id: "home", label: "Home" },
              { id: "profile", label: "Profile" },
              { id: "chat", label: "Chat with AI" },
              { id: "friends", label: "Friends" },
              { id: "notifications", label: "Notifications" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-3 py-2 transition ${
                  activeTab === item.id
                    ? "bg-slate-100 font-semibold text-slate-900"
                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className={`${mobileNavOpen ? "block" : "hidden"} px-4 pb-4 sm:px-6 lg:hidden`}>
          <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <nav className="space-y-3 text-sm text-slate-700">
              {[
                { id: "home", label: "Home" },
                { id: "profile", label: "Profile" },
                { id: "chat", label: "Chat with AI" },
                { id: "friends", label: "Friends" },
                { id: "notifications", label: "Notifications" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileNavOpen(false);
                  }}
                  className={`block w-full rounded-xl px-3 py-2 text-left transition ${
                    activeTab === item.id
                      ? "bg-white font-semibold text-slate-900"
                      : "text-slate-700 hover:bg-white hover:text-slate-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[260px_minmax(600px,1fr)_320px]">
        <aside className="space-y-6">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
                F
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">Julia Park</p>
                <p className="text-sm text-slate-500">Product Manager</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                Profile visits this week: <span className="font-semibold text-slate-900">210</span>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
                New connections: <span className="font-semibold text-slate-900">18</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => setModalType("post")}
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Create a post
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("home");
                  openCollection("communities");
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Communities
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("home");
                  openCollection("channels");
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Channels
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("home");
                  openCollection("groups");
                }}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Groups
              </button>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          {activeTab !== "home" ? (
            <HomeContent activeTab={activeTab} />
          ) : mainView === "home" ? (
            <div className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Your feed</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900">Community updates, channel notes, and friend posts</h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModalType("post")}
                    className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    New post
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <article key={post.id} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                            {post.type}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">
                          {post.author} • {post.role}
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        {post.time}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-700">{post.content}</p>

                    {post.community ? (
                      <div className="mt-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                        {post.community}
                      </div>
                    ) : null}

                    {post.imageUrls && post.imageUrls.length > 0 ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {post.imageUrls.map((image, index) => (
                          <img key={`${post.id}-${index}`} src={image} alt={`${post.title} visual ${index + 1}`} className="h-48 w-full rounded-3xl object-cover" />
                        ))}
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          ) : mainView === "communities" ? (
            <div className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Communities</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900">Explore communities and open any one of them</h1>
                  </div>
                  <button type="button" onClick={() => setMainView("home")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Back to feed
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {communities.map((item) => (
                  <article key={item.id} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{item.category}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        <p className="mt-3 text-sm text-slate-500">{item.members.toLocaleString()} members • {item.joined ? "Joined" : "Open to join"}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => toggleJoin(item.id, "communities")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          {item.joined ? "Leave" : "Join"}
                        </button>
                        <button type="button" onClick={() => openDetail("community", item.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          Open
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : mainView === "channels" ? (
            <div className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Channels</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900">Browse channels and open their conversations</h1>
                  </div>
                  <button type="button" onClick={() => setMainView("home")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Back to feed
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {channels.map((item) => (
                  <article key={item.id} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{item.category}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        <p className="mt-3 text-sm text-slate-500">{item.members.toLocaleString()} members • {item.joined ? "Following" : "Available to follow"}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => toggleJoin(item.id, "channels")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          {item.joined ? "Unfollow" : "Follow"}
                        </button>
                        <button type="button" onClick={() => openDetail("channel", item.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          Open
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : mainView === "groups" ? (
            <div className="space-y-6">
              <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Groups</p>
                    <h1 className="mt-2 text-2xl font-semibold text-slate-900">Open a group to see its members and posts</h1>
                  </div>
                  <button type="button" onClick={() => setMainView("home")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    Back to feed
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {groups.map((item) => (
                  <article key={item.id} className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-semibold text-slate-900">{item.name}</h2>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">{item.category}</span>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                        <p className="mt-3 text-sm text-slate-500">{item.members.toLocaleString()} members • {item.joined ? "Joined" : "Open to join"}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => toggleJoin(item.id, "groups")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          {item.joined ? "Leave" : "Join"}
                        </button>
                        <button type="button" onClick={() => openDetail("group", item.id)} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          Open
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : mainView === "communityDetail" && selectedItem ? (
            (() => {
              const item = communities.find((entry) => entry.id === selectedItem.id);
              if (!item) return null;
              return (
                <div className="space-y-6">
                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Community</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h1>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => openCollection("communities")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Back to list
                        </button>
                        <button type="button" onClick={() => toggleJoin(item.id, "communities")} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          {item.joined ? "Leave" : "Join"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                      <button
                        type="button"
                        onClick={() => setDetailTab("members")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "members" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Members
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("posts")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "posts" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Posts
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("chat")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "chat" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Chat
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("announcements")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "announcements" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Announcements
                      </button>
                    </div>

                    {detailTab === "members" ? (
                      <div className="mt-4 space-y-3">
                        {item.membersList.map((member) => (
                          <div key={member.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">{member.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "posts" ? (
                      <div className="mt-4 space-y-3">
                        {item.detailPosts.map((post) => (
                          <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{post.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{post.time}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{post.author} • {post.role}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "chat" ? (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-3">
                          {item.chatHistory.map((message) => (
                            <div key={message.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{message.sender}</p>
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{message.time}</span>
                              </div>
                              <p className="mt-1 text-sm text-slate-600">{message.role}</p>
                              <p className="mt-2 text-sm leading-7 text-slate-700">{message.message}</p>
                              {message.attachment ? <p className="mt-2 text-sm font-semibold text-slate-700">Attachment: {message.attachment}</p> : null}
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleChatSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <label className="block text-sm font-medium text-slate-700">
                            Message
                            <textarea
                              value={chatInput}
                              onChange={(event) => setChatInput(event.target.value)}
                              rows={3}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Write a note to the community..."
                            />
                          </label>
                          <label className="mt-3 block text-sm font-medium text-slate-700">
                            Attachment
                            <input
                              value={chatAttachment}
                              onChange={(event) => setChatAttachment(event.target.value)}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Add a document name (optional)"
                            />
                          </label>
                          <div className="mt-4 flex justify-end">
                            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-3">
                        {item.announcements.map((announcement) => (
                          <div key={announcement.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{announcement.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{announcement.time}</span>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{announcement.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : mainView === "channelDetail" && selectedItem ? (
            (() => {
              const item = channels.find((entry) => entry.id === selectedItem.id);
              if (!item) return null;
              return (
                <div className="space-y-6">
                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Channel</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h1>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => openCollection("channels")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Back to list
                        </button>
                        <button type="button" onClick={() => toggleJoin(item.id, "channels")} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          {item.joined ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                      <button
                        type="button"
                        onClick={() => setDetailTab("members")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "members" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Members
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("posts")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "posts" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Posts
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("chat")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "chat" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Chat
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("announcements")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "announcements" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Announcements
                      </button>
                    </div>

                    {detailTab === "members" ? (
                      <div className="mt-4 space-y-3">
                        {item.membersList.map((member) => (
                          <div key={member.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">{member.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "posts" ? (
                      <div className="mt-4 space-y-3">
                        {item.detailPosts.map((post) => (
                          <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{post.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{post.time}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{post.author} • {post.role}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "chat" ? (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-3">
                          {item.chatHistory.map((message) => (
                            <div key={message.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{message.sender}</p>
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{message.time}</span>
                              </div>
                              <p className="mt-1 text-sm text-slate-600">{message.role}</p>
                              <p className="mt-2 text-sm leading-7 text-slate-700">{message.message}</p>
                              {message.attachment ? <p className="mt-2 text-sm font-semibold text-slate-700">Attachment: {message.attachment}</p> : null}
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleChatSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <label className="block text-sm font-medium text-slate-700">
                            Message
                            <textarea
                              value={chatInput}
                              onChange={(event) => setChatInput(event.target.value)}
                              rows={3}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Write a note to the group..."
                            />
                          </label>
                          <label className="mt-3 block text-sm font-medium text-slate-700">
                            Attachment
                            <input
                              value={chatAttachment}
                              onChange={(event) => setChatAttachment(event.target.value)}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Add a document name (optional)"
                            />
                          </label>
                          <div className="mt-4 flex justify-end">
                            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-3">
                        {item.announcements.map((announcement) => (
                          <div key={announcement.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{announcement.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{announcement.time}</span>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{announcement.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : mainView === "groupDetail" && selectedItem ? (
            (() => {
              const item = groups.find((entry) => entry.id === selectedItem.id);
              if (!item) return null;
              return (
                <div className="space-y-6">
                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">Group</p>
                        <h1 className="mt-2 text-2xl font-semibold text-slate-900">{item.name}</h1>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => openCollection("groups")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                          Back to list
                        </button>
                        <button type="button" onClick={() => toggleJoin(item.id, "groups")} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                          {item.joined ? "Leave" : "Join"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
                      <button
                        type="button"
                        onClick={() => setDetailTab("members")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "members" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Members
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("posts")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "posts" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Posts
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("chat")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "chat" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Chat
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailTab("announcements")}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${detailTab === "announcements" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"}`}
                      >
                        Announcements
                      </button>
                    </div>

                    {detailTab === "members" ? (
                      <div className="mt-4 space-y-3">
                        {item.membersList.map((member) => (
                          <div key={member.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <p className="font-semibold text-slate-900">{member.name}</p>
                            <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "posts" ? (
                      <div className="mt-4 space-y-3">
                        {item.detailPosts.map((post) => (
                          <div key={post.id} className="rounded-2xl border border-slate-200 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{post.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{post.time}</span>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">{post.author} • {post.role}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : detailTab === "chat" ? (
                      <div className="mt-4 space-y-4">
                        <div className="space-y-3">
                          {item.chatHistory.map((message) => (
                            <div key={message.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                              <div className="flex items-center justify-between gap-2">
                                <p className="font-semibold text-slate-900">{message.sender}</p>
                                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{message.time}</span>
                              </div>
                              <p className="mt-1 text-sm text-slate-600">{message.role}</p>
                              <p className="mt-2 text-sm leading-7 text-slate-700">{message.message}</p>
                              {message.attachment ? <p className="mt-2 text-sm font-semibold text-slate-700">Attachment: {message.attachment}</p> : null}
                            </div>
                          ))}
                        </div>

                        <form onSubmit={handleChatSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                          <label className="block text-sm font-medium text-slate-700">
                            Message
                            <textarea
                              value={chatInput}
                              onChange={(event) => setChatInput(event.target.value)}
                              rows={3}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Write a note to the group..."
                            />
                          </label>
                          <label className="mt-3 block text-sm font-medium text-slate-700">
                            Attachment
                            <input
                              value={chatAttachment}
                              onChange={(event) => setChatAttachment(event.target.value)}
                              className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                              placeholder="Add a document name (optional)"
                            />
                          </label>
                          <div className="mt-4 flex justify-end">
                            <button type="submit" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
                              Send
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-3">
                        {item.announcements.map((announcement) => (
                          <div key={announcement.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-semibold text-slate-900">{announcement.title}</p>
                              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{announcement.time}</span>
                            </div>
                            <p className="mt-2 text-sm leading-7 text-slate-700">{announcement.detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          ) : null}
        </section>

        <aside className="space-y-6">
          <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Overview</p>
                <p className="text-xs text-slate-500">Quick stats and shortcuts</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Live</span>
            </div>
            <div className="mt-6 grid gap-3">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Updates: 4 new</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Connections: 18</div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">Messages: 2 unread</div>
            </div>
          </div>
        </aside>
      </main>

      {modalType ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="w-full max-w-3xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {modalType === "post" ? "Create a post" : modalType === "communities" ? "Communities" : modalType === "channels" ? "Channels" : "Groups"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-slate-900">
                  {modalType === "post"
                    ? "Share an update with your network"
                    : modalType === "communities"
                      ? "Discover communities and manage your joins"
                      : modalType === "channels"
                        ? "Explore channels and follow what matters"
                        : "See groups and join the right circles"}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="max-h-[75vh] overflow-y-auto p-6">
              {modalType === "post" ? (
                <form className="space-y-4" onSubmit={handleCreatePost}>
                  <label className="block text-sm font-medium text-slate-700">
                    Title
                    <input
                      value={draftTitle}
                      onChange={(event) => setDraftTitle(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      placeholder="What would you like to share?"
                    />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Content
                    <textarea
                      value={draftContent}
                      onChange={(event) => setDraftContent(event.target.value)}
                      rows={8}
                      className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                      placeholder="Write something thoughtful and useful..."
                    />
                  </label>

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                      <span>Attach images</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>

                    {draftImages.length > 0 ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {draftImages.map((image, index) => (
                          <img key={`${image}-${index}`} src={image} alt={`Preview ${index + 1}`} className="h-40 w-full rounded-2xl object-cover" />
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setModalType(null)}
                      className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      Publish post
                    </button>
                  </div>
                </form>
              ) : null}

            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
