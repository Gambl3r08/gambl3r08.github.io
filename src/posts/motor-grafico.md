---
title: "Motor grafico en .NET 10 y Silk.NET Parte 1"
description: "Desarrollando un motor grafico 2.5D con vista isometrica en .NET 10 usando Silk.NET"
date: "2026-03-21"
published: true
lang: es
tags:
  - desarrollo
  - gamedev
  - dotnet
  - csharp
---

# Ostin Engine - Motor Grafico 2.5D Isometrico

Me propuse hacer un motor grafico con C# como pasatiempo y aprendizaje.
El motor esta construido sobre **.NET 10** usando **Silk.NET** para windowing, OpenGL, input y audio.
Actualmente cuenta con **651 archivos C#** distribuidos en mas de **90 modulos**.

## Stack Tecnologico

| Paquete | Version | Uso |
|---------|---------|-----|
| Silk.NET | 2.21.0 | Windowing, OpenGL, Input |
| Silk.NET.Assimp | 2.21.0 | Carga de modelos 3D (FBX, GLTF, OBJ) |
| Silk.NET.OpenAL | 2.21.0 | Audio espacial |
| StbImageSharp | 2.27.14 | Carga de imagenes |
| NVorbis | 0.10.5 | Decodificacion OGG |

## Estructura General

```
ostin_engine/
├── ostin_base_engine/    # Biblioteca principal del motor (537 archivos)
├── ostin_demo/           # Proyecto demo RPG (54 archivos)
├── ostin_tests/          # Tests xUnit (60 archivos, 1393 tests)
├── ostin_engine.slnx     # Solucion
└── .github/workflows/    # CI/CD (Ubuntu/Windows/macOS)
```

---

## ostin_base_engine — El Motor

### Core

```
Core/
├── Assets/                      # AssetManager, AsyncAssetLoader, AssetBatch, ContentValidator
├── Configuration/               # ConfigManager, HotConfigReload, SettingsManager
├── Events/                      # EventBus (inyectado, NO singleton), EventChain
├── Persistence/                 # SaveManager, GameSession, AutoSave, CrashRecovery
├── Logging/                     # Logger, ConsoleLogger, FileLogger
├── Tweening/                    # TweenManager (30+ easings)
├── Pooling/                     # ObjectPool<T>, ComponentPool<T>, IPoolable
├── StateMachine/                # StateMachine, IState, StateTransition
├── Diagnostics/                 # ErrorBoundary, PerformanceProfiler
└── Localization/                # LocalizationManager
```

### Rendering

```
Rendering/
├── SpriteBatch.cs               # Core sprite batching
├── Camera2D.cs                  # Camara isometrica
├── Texture2D.cs                 # Texturas GPU
├── BitmapFont.cs                # Fuentes bitmap
├── TextRenderer.cs              # Renderizado de texto
├── Shader.cs                    # Shaders GLSL (mat3/mat4)
│
├── Atlas/                       # SpriteAtlas, MaxRects packing
├── Lighting/                    # DynamicLighting, LightRenderer
├── FogOfWar/                    # FogOfWar + Renderer
├── Particles/                   # ParticleEmitter, RibbonEmitter, TrailRenderer
│
├── PostProcess/                 # RenderTarget, Vignette, ColorGrading, DayNight
│   └── Effects/                 # WaterShader, OutlineEffect, SelectionRenderer
│
└── Model3D/                     # Pipeline 3D completo
    ├── ModelRenderer.cs         # Blinn-Phong, Begin/Draw/End
    ├── ModelLoader.cs           # Assimp (FBX, GLTF, OBJ)
    ├── Model3D.cs               # Coleccion de mallas + bounding box
    ├── Mesh3D.cs                # VAO/VBO/EBO
    ├── Vertex3D.cs              # 48 bytes (Pos+Normal+UV+Color)
    ├── Material3D.cs            # Diffuse texture + color + shininess
    └── ModelTransform.cs        # Scale * RotXYZ * Translation
```

### Input y Windowing

```
Input/                           # InputManager, InputActionManager, KeyBindings, Gamepad
Windowing/                       # GameWindow, ScreenManager (Letterbox/Stretch/IntegerScale/PixelPerfect)
```

### Audio

```
Audio/
├── AudioManager.cs              # Audio central
├── AudioSourcePool.cs           # OpenAL pooling (max 64)
├── AudioDuckingManager.cs       # Bus-based ducking
├── AdaptiveMusicManager.cs      # Musica adaptativa
├── SoundPriorityManager.cs      # Prioridad de sonidos
└── ...                          # SFX, Music, Spatial Audio 3D
```

### Entidades y Componentes

```
Entities/
├── Entity.cs + EntityManager.cs # Sistema ECS-like
├── EntityPool.cs                # ConcurrentBag pooling
├── EntityGarbageCollector.cs    # Sweep periodico con GC pressure detection
├── Components/                  # Transform, Sprite, Collider, Animator
├── Systems/                     # Movement, Rendering, Animation
├── Prefabs/                     # PrefabManager, PrefabLoader
└── Serialization/               # EntitySerializer, ComponentSerializer
```

### Otros Sistemas Base

```
Animation/                       # AnimationStateMachine (Mecanim-style), FSM, Transitions
AI/                              # BehaviorTree, AIComponent
Physics/                         # CollisionSystem, SpatialHashGrid, Raycasting
Pathfinding/                     # A* Pathfinder, NavMesh
Tilemap/                         # IsometricTilemap, ChunkManager, ChunkSerializer ("OSTC"), LOD
Scenes/                          # SceneManager, Transitions (Fade/Slide/Dissolve/Circle/Wipe)
Networking/                      # TCP, StateSyncManager (20Hz), SnapshotBuffer, NetworkEntity
Debug/                           # DebugOverlay, DebugConsole, Profiler, PhysicsDebugDrawer
```

### UI

```
UI/
├── UIElement.cs + UIManager.cs  # Base UI system
├── Elements/                    # Button, TextBox, Label, ProgressBar, Slider, Toggle, Dropdown, ScrollPanel...
├── Layout/                      # LayoutGroup, GridLayout, FlexLayout
├── DragDrop/                    # Drag & Drop system
├── Tooltip/                     # TooltipManager
├── Minimap/                     # Minimap con iconos
├── FloatingText/                # DamageNumbers, FloatingText
├── Notifications/               # NotificationManager
└── Accessibility/               # AccessibilityManager, ColorBlindFilter (Brettel matrices)
```

---

## Gameplay Systems (200+ archivos)

### Combate

```
Combat/                          # CombatSession, DamageCalculator, GroundZones, Formations
│                                # CombatLog, CombatReplay, CombatFeedback, LineOfSight
│
TurnBased/                       # TurnManager, ActionQueue (estilo Dofus)
│
Skills/                          # SkillDatabase, AOEShapeCalculator, TargetingPreview
│                                # SkillCombos, SkillCooldown, SkillCasting
```

### RPG Core

```
Stats/                           # StatType, StatTypeMapper (enum ↔ string), StatModifier, ScalingCurves
StatusEffects/                   # StatusEffect, ActiveStatusEffect
Items/                           # ItemDefinition, ItemDatabase, ItemRarity, Equipment
│   └── Equipment/               # EquippableItem, EquipmentComponent, CustomBonuses, Runas
Inventory/                       # InventoryManager, ItemStack
Crafting/                        # Recipe (RandomStatRanges), CraftingComponent (RollRandomStats)
Drops/                           # DropTable (weighted lottery), DropManager
Shop/                            # Shop, Merchant (price floor: compra=1, venta=0)
```

### Social y Mundo

```
World/                           # TimeSystem, WeatherSystem (ambos ISaveable), DayNight, Seasons
Dialog/                          # DialogManager (tracking nodos visitados, anti-loop), DialogNode
NPC/                             # NPCDefinition, NPCDatabase, NPCInteraction
Social/                          # Friends, Party, Guild, Alliance
Chat/                            # ChatManager (DateTime.UtcNow), ChatFilter
Quests/                          # QuestDefinition, QuestDatabase
Achievements/                    # AchievementManager
Mounts/                          # Mount, MountDefinition
Pets/                            # Pet, PetDefinition
Cosmetics/                       # CosmeticItem, TransmogSystem
PvP/                             # DuelSystem, ArenaManager, Ranking
Karma/                           # KarmaSystem
Tutorial/                        # TutorialManager, TutorialStep, TutorialHint
Cutscene/                        # CutsceneManager (Dialog/Animate/Camera/Delay actions)
MagicForging/                    # MagicForge
Professions/                     # ProfessionManager
```

---

## Sistema de Dungeons (27 archivos)

Pipeline completo: **RoomTemplate → DungeonLayout (grafo) → Builder → Runtime**

```
Dungeons/
├── Templates/                   # RoomTemplate, RoomTemplateDatabase (singleton), SpawnPoint, RoomExit, TriggerZone
├── Layout/                      # DungeonLayout (grafo de salas), LayoutValidator
├── Building/                    # StaticDungeonBuilder, CorridorGenerator
├── Procedural/                  # GraphBasedGenerator (Dofus-style), BSPGenerator (roguelike), CellularAutomata
└── Runtime/                     # DungeonSceneController, RoomTransitionHandler, EntitySpawner, ProgressTracker
```

Dos estilos: `RoomByRoom` (Dofus, transiciones entre salas) y `Continuous` (roguelike, corredores).

---

## Sistema de Criaturas (50+ archivos)

Inspirado en Pokemon y Temtem, con mecanicas hibridas.

### Core

```
Creatures/
├── CreatureType.cs              # 13 tipos elementales (Normal/Fire/Water/Earth/Air/Light/Dark/Electric/Nature/Ice/Poison/Crystal/Mental)
├── TypeEffectiveness.cs         # Chart dual-type con inmunidades
├── CreatureNature.cs            # 25 naturalezas (20 stat-modifying +10%/-10%, 5 neutras)
├── CreatureSpecies.cs           # Especie inmutable: base stats (7), catch rate, abilities, egg groups, evolution
├── CreatureStatCalculator.cs    # HP formula Pokemon, Stamina formula Temtem
├── CreatureInstance.cs          # Individuo ISaveable: IVs[7], EVs[7], nature, 4 moves, ability, gender, shiny, fertility
└── CreatureFactory.cs           # CreateWild, CreatePerfect, CreateStarter
```

### Captura y Cria

```
Capture/                         # CaptureCalculator (Gen VIII), CaptureItem, critical capture
Storage/                         # CreatureStorage ISaveable (32 boxes x 30 + 6 party)
Breeding/                        # BreedingSystem (fertility Temtem-style), EggHatchingSystem (FlameBody 2x)
ShinyCalculator.cs               # Base 1/4096, Charm, chain bonus, Masuda method
```

### Movimientos

```
Moves/
├── CreatureMove.cs              # Physical/Special/Status, 6 targets, Priority, MultiHit, Recoil, Drain
├── MoveEffect.cs                # 9 tipos de efecto (StatChange/StatusInflict/Heal/Weather/Flinch/Trap/Protect...)
├── StatStageSystem.cs           # Stages -6 to +6, multiplier tables 0.25x-4.0x
└── MoveTutor.cs                 # Level/TM/Egg moves
```

### Sistema de Batalla

```
Battle/
├── BattleEngine.cs              # Motor turn-based, ExecuteTurn, end-of-turn processing
├── BattleCreature.cs            # Wrapper con StatStages, Conditions, GetEffectiveStat
├── BattleDamageCalculator.cs    # STAB 1.5x, type effectiveness, critical (4-stage), weather
├── BattleAction.cs              # Move/Switch/Item/Flee/Skip + BattleTurnOrder
├── CreatureBattleAI.cs          # 5 personalidades (Random/Aggressive/Defensive/Smart/Boss)
├── CreatureStatusCondition.cs   # 11 condiciones, bad poison escalation, 20% Freeze thaw
├── BattleWeather.cs             # 6 climas con type multipliers
├── BattleTerrain.cs             # 5 terrenos (Electric/Grassy/Misty/Psychic)
├── BattleEntryHazards.cs        # StealthRock/Spikes/ToxicSpikes/StickyWeb (layers)
├── DoubleBattleSupport.cs       # Single/Double/Triple/Rotation format
├── HeldItemEffect.cs            # 9 triggers, stat boosts, type damage bonus
│
├── WildBattleOrchestrator.cs    # Encounter → BattleEngine → ResultProcessor → MoveLearn → Evolution
├── TrainerBattleOrchestrator.cs # TrainerDefinition → BattleEngine → rewards
├── BattleResultProcessor.cs     # Orquesta exp, bestiary, evolution, storage
├── ExperienceDistributor.cs     # ExpShare, EV distribution
├── MoveLearnFlow.cs             # Post-level-up move learning
└── BattleItemProcessor.cs       # 7 tipos de items en batalla
```

### Otros Sistemas de Criaturas

```
Evolution/                       # 8 triggers (Level/Friendship/Item/Location/TimeOfDay/Gender/Trade/Special)
Bestiary/                        # ISaveable, Seen/Caught tracking, CompletionPercent
Encounter/                       # EncounterTable, EncounterManager (per-zone, step counter, repel, swarm)
Trading/                         # TradeSystem (ObtainMethod="traded", Friendship=70)
Trainers/                        # TrainerDefinition, TrainerDatabase, NpcTrainerBridge (badges, rematch)
Serialization/                   # 8 serializers JSON para especies, moves, abilities, encounters, evolution, trainers...
Validation/                      # CreatureContentValidator (integridad referencial)
```

---

## Sistema Roguelike (13 archivos)

```
Roguelike/
├── RoguelikeRun.cs              # ISaveable, seed, RunState, GetFloorSeed
├── RoguelikeRunConfig.cs        # MaxFloors, Permadeath, DifficultyScaling, BossFloorInterval
├── FloorGenerator.cs            # Wraps IDungeonGenerator + FloorDifficultyScaler
├── MetaProgression.cs           # ISaveable, MetaCurrency (Souls), 8 tipos de unlock persistente
├── RunStatistics.cs             # Tracking + RunHistoryDatabase
│
├── Affixes/                     # ItemAffix (Prefix/Suffix, Minor-Supreme), weighted lottery
├── Events/                      # RandomEventSystem (Shrine/Merchant/Curse/Blessing/Mystery/Challenge)
└── Traps/                       # TrapSystem (Step/Proximity/Timed/Manual, 6 effect types)
```

---

## Editor Tools (13 archivos)

```
Editor/
├── ParticleConfigSerializer.cs  # JSON DTO ↔ ParticleEmitterConfig
├── ParticlePresetManager.cs     # Directory-based .json presets
├── LayoutGraphRenderer.cs       # Visualiza DungeonLayout como grafo coloreado
├── TilePalettePanel.cs          # Grid scrollable de tiles con seleccion
├── PropertyInspector.cs         # Inspector generico (Int/Float/String/Bool/Enum/Color/Vector2)
├── EditorUndoStack.cs           # IEditorAction Execute/Undo, MaxHistory=100
└── ...                          # CreateRoom/DeleteRoom actions
```

---

## ostin_demo — Demo RPG

```
ostin_demo/
├── Program.cs                   # Entry point, registra 8 escenas
│
├── Scenes/
│   ├── MainMenuScene.cs         # Menu principal con 6 botones
│   ├── RPGDemoScene.cs          # Mundo RPG isometrico
│   ├── CombatScene.cs           # Combate por turnos (Dofus-inspired UI)
│   ├── DofusBattleDemoScene.cs  # Demo batalla con criaturas y assets reales
│   ├── PauseScene.cs            # Menu de pausa
│   ├── ParticleEditorScene.cs   # Editor visual de particulas
│   ├── DungeonLayoutEditorScene.cs # Editor visual de dungeons
│   └── Model3DDemoScene.cs      # Visor de modelos 3D
│
├── Data/                        # DemoCreatures, DemoItems, DemoSkills, DemoShops, DemoQuests...
├── Entities/                    # RPGPlayerEntity, RPGEnemyEntity, ChestEntity
├── UI/                          # DialogPanel, InventoryPanel, EquipmentPanel, SkillBar, CraftingPanel
└── Utils/                       # TinySwordsAssets, DemoAudio, PlaceholderTextures
```

---

## ostin_tests — 1393 Tests

```
ostin_tests/
├── Core/                        # Events, Persistence, Assets, Configuration, Diagnostics, Pooling, StateMachine
├── Gameplay/                    # Combat, Stats, Skills, Drops, Dialog, Crafting, CreatureBattleProductionTests
├── Dungeons/                    # Layout, Building, Procedural
├── Integration/                 # Full system integration tests
├── Rendering/                   # Sprite/texture tests
├── Entities/                    # Entity/Component tests
├── Networking/                  # StateSync tests
└── ...                          # Animation, Audio, Input, Particles, Pathfinding, Physics, Roguelike, Scenes, Tilemap, UI, Windowing, Editor
```

---

## Resumen

| Metrica | Cantidad |
|---------|----------|
| Archivos C# totales | 651 |
| ostin_base_engine | 537 |
| ostin_demo | 54 |
| ostin_tests | 60 |
| Modulos principales | 90+ |
| Sistemas de gameplay | 40+ |
| Sistemas de criaturas | 50+ |
| Tests | 1,393 |
| Target | .NET 10 |
| CI/CD | Ubuntu / Windows / macOS |

## Patrones Clave

- **EventBus** inyectado via constructor (NO singleton)
- **Singleton databases** con Register/Get pattern
- **Sealed classes** por defecto
- **ISaveable** con BinaryWriter/BinaryReader para persistencia
- **Object pooling** para entidades y componentes frecuentes
- **Begin/Draw/End** pattern para renderers (SpriteBatch, ModelRenderer)
- **Coordenadas isometricas**: `(gridX - gridY) * (tileW/2), (gridX + gridY) * (tileH/2)`

El motor sigue creciendo y ya soporta desde combate por turnos estilo Dofus hasta un sistema completo de criaturas tipo Pokemon, todo corriendo sobre OpenGL 4.1 Core con vista isometrica.

la idea final probar por lo indie con rpgs para ganar mayor experiencia en el desarrollo.
