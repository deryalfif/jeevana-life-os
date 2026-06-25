import { createBundledHighlighter, createSingletonShorthands, guessEmbeddedLanguages } from "./@shikijs/core+[...].mjs";
import { createOnigurumaEngine } from "./shikijs__engine-oniguruma.mjs";
import { createJavaScriptRegexEngine } from "./@shikijs/engine-javascript+[...].mjs";
//#region node_modules/@streamdown/code/node_modules/shiki/dist/langs.mjs
var bundledLanguagesInfo = [
	{
		"id": "abap",
		"name": "ABAP",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.abap_exports))
	},
	{
		"id": "actionscript-3",
		"name": "ActionScript",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.actionscript_3_exports))
	},
	{
		"id": "ada",
		"name": "Ada",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ada_exports))
	},
	{
		"id": "angular-html",
		"name": "Angular HTML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.angular_html_exports))
	},
	{
		"id": "angular-ts",
		"name": "Angular TypeScript",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.angular_ts_exports))
	},
	{
		"id": "apache",
		"name": "Apache Conf",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.apache_exports))
	},
	{
		"id": "apex",
		"name": "Apex",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.apex_exports))
	},
	{
		"id": "apl",
		"name": "APL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.apl_exports))
	},
	{
		"id": "applescript",
		"name": "AppleScript",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.applescript_exports))
	},
	{
		"id": "ara",
		"name": "Ara",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ara_exports))
	},
	{
		"id": "asciidoc",
		"name": "AsciiDoc",
		"aliases": ["adoc"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.asciidoc_exports))
	},
	{
		"id": "asm",
		"name": "Assembly",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.asm_exports))
	},
	{
		"id": "astro",
		"name": "Astro",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.astro_exports))
	},
	{
		"id": "awk",
		"name": "AWK",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.awk_exports))
	},
	{
		"id": "ballerina",
		"name": "Ballerina",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ballerina_exports))
	},
	{
		"id": "bat",
		"name": "Batch File",
		"aliases": ["batch"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.bat_exports))
	},
	{
		"id": "beancount",
		"name": "Beancount",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.beancount_exports))
	},
	{
		"id": "berry",
		"name": "Berry",
		"aliases": ["be"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.berry_exports))
	},
	{
		"id": "bibtex",
		"name": "BibTeX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.bibtex_exports))
	},
	{
		"id": "bicep",
		"name": "Bicep",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.bicep_exports))
	},
	{
		"id": "bird2",
		"name": "BIRD2 Configuration",
		"aliases": ["bird"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.bird2_exports))
	},
	{
		"id": "blade",
		"name": "Blade",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.blade_exports))
	},
	{
		"id": "bsl",
		"name": "1C (Enterprise)",
		"aliases": ["1c"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.bsl_exports))
	},
	{
		"id": "c",
		"name": "C",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.c_exports))
	},
	{
		"id": "c3",
		"name": "C3",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.c3_exports))
	},
	{
		"id": "cadence",
		"name": "Cadence",
		"aliases": ["cdc"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cadence_exports))
	},
	{
		"id": "cairo",
		"name": "Cairo",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cairo_exports))
	},
	{
		"id": "clarity",
		"name": "Clarity",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.clarity_exports))
	},
	{
		"id": "clojure",
		"name": "Clojure",
		"aliases": ["clj"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.clojure_exports))
	},
	{
		"id": "cmake",
		"name": "CMake",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cmake_exports))
	},
	{
		"id": "cobol",
		"name": "COBOL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cobol_exports))
	},
	{
		"id": "codeowners",
		"name": "CODEOWNERS",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.codeowners_exports))
	},
	{
		"id": "codeql",
		"name": "CodeQL",
		"aliases": ["ql"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.codeql_exports))
	},
	{
		"id": "coffee",
		"name": "CoffeeScript",
		"aliases": ["coffeescript"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.coffee_exports))
	},
	{
		"id": "common-lisp",
		"name": "Common Lisp",
		"aliases": ["lisp"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.common_lisp_exports))
	},
	{
		"id": "coq",
		"name": "Coq",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.coq_exports))
	},
	{
		"id": "cpp",
		"name": "C++",
		"aliases": ["c++"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cpp_exports))
	},
	{
		"id": "crystal",
		"name": "Crystal",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.crystal_exports))
	},
	{
		"id": "csharp",
		"name": "C#",
		"aliases": ["c#", "cs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.csharp_exports))
	},
	{
		"id": "css",
		"name": "CSS",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.css_exports))
	},
	{
		"id": "csv",
		"name": "CSV",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.csv_exports))
	},
	{
		"id": "cue",
		"name": "CUE",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cue_exports))
	},
	{
		"id": "cypher",
		"name": "Cypher",
		"aliases": ["cql"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.cypher_exports))
	},
	{
		"id": "d",
		"name": "D",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.d_exports))
	},
	{
		"id": "dart",
		"name": "Dart",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.dart_exports))
	},
	{
		"id": "dax",
		"name": "DAX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.dax_exports))
	},
	{
		"id": "desktop",
		"name": "Desktop",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.desktop_exports))
	},
	{
		"id": "diff",
		"name": "Diff",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.diff_exports))
	},
	{
		"id": "docker",
		"name": "Dockerfile",
		"aliases": ["dockerfile"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.docker_exports))
	},
	{
		"id": "dotenv",
		"name": "dotEnv",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.dotenv_exports))
	},
	{
		"id": "dream-maker",
		"name": "Dream Maker",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.dream_maker_exports))
	},
	{
		"id": "edge",
		"name": "Edge",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.edge_exports))
	},
	{
		"id": "elixir",
		"name": "Elixir",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.elixir_exports))
	},
	{
		"id": "elm",
		"name": "Elm",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.elm_exports))
	},
	{
		"id": "emacs-lisp",
		"name": "Emacs Lisp",
		"aliases": ["elisp"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.emacs_lisp_exports))
	},
	{
		"id": "erb",
		"name": "ERB",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.erb_exports))
	},
	{
		"id": "erlang",
		"name": "Erlang",
		"aliases": ["erl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.erlang_exports))
	},
	{
		"id": "fennel",
		"name": "Fennel",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fennel_exports))
	},
	{
		"id": "fish",
		"name": "Fish",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fish_exports))
	},
	{
		"id": "fluent",
		"name": "Fluent",
		"aliases": ["ftl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fluent_exports))
	},
	{
		"id": "fortran-fixed-form",
		"name": "Fortran (Fixed Form)",
		"aliases": [
			"f",
			"for",
			"f77"
		],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fortran_fixed_form_exports))
	},
	{
		"id": "fortran-free-form",
		"name": "Fortran (Free Form)",
		"aliases": [
			"f90",
			"f95",
			"f03",
			"f08",
			"f18"
		],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fortran_free_form_exports))
	},
	{
		"id": "fsharp",
		"name": "F#",
		"aliases": ["f#", "fs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.fsharp_exports))
	},
	{
		"id": "gdresource",
		"name": "GDResource",
		"aliases": ["tscn", "tres"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gdresource_exports))
	},
	{
		"id": "gdscript",
		"name": "GDScript",
		"aliases": ["gd"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gdscript_exports))
	},
	{
		"id": "gdshader",
		"name": "GDShader",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gdshader_exports))
	},
	{
		"id": "genie",
		"name": "Genie",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.genie_exports))
	},
	{
		"id": "gherkin",
		"name": "Gherkin",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gherkin_exports))
	},
	{
		"id": "git-commit",
		"name": "Git Commit Message",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.git_commit_exports))
	},
	{
		"id": "git-rebase",
		"name": "Git Rebase Message",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.git_rebase_exports))
	},
	{
		"id": "gleam",
		"name": "Gleam",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gleam_exports))
	},
	{
		"id": "glimmer-js",
		"name": "Glimmer JS",
		"aliases": ["gjs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.glimmer_js_exports))
	},
	{
		"id": "glimmer-ts",
		"name": "Glimmer TS",
		"aliases": ["gts"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.glimmer_ts_exports))
	},
	{
		"id": "glsl",
		"name": "GLSL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.glsl_exports))
	},
	{
		"id": "gn",
		"name": "GN",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gn_exports))
	},
	{
		"id": "gnuplot",
		"name": "Gnuplot",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.gnuplot_exports))
	},
	{
		"id": "go",
		"name": "Go",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.go_exports))
	},
	{
		"id": "graphql",
		"name": "GraphQL",
		"aliases": ["gql"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.graphql_exports))
	},
	{
		"id": "groovy",
		"name": "Groovy",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.groovy_exports))
	},
	{
		"id": "hack",
		"name": "Hack",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hack_exports))
	},
	{
		"id": "haml",
		"name": "Ruby Haml",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.haml_exports))
	},
	{
		"id": "handlebars",
		"name": "Handlebars",
		"aliases": ["hbs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.handlebars_exports))
	},
	{
		"id": "haskell",
		"name": "Haskell",
		"aliases": ["hs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.haskell_exports))
	},
	{
		"id": "haxe",
		"name": "Haxe",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.haxe_exports))
	},
	{
		"id": "hcl",
		"name": "HashiCorp HCL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hcl_exports))
	},
	{
		"id": "hjson",
		"name": "Hjson",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hjson_exports))
	},
	{
		"id": "hlsl",
		"name": "HLSL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hlsl_exports))
	},
	{
		"id": "html",
		"name": "HTML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.html_exports))
	},
	{
		"id": "html-derivative",
		"name": "HTML (Derivative)",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.html_derivative_exports))
	},
	{
		"id": "http",
		"name": "HTTP",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.http_exports))
	},
	{
		"id": "hurl",
		"name": "Hurl",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hurl_exports))
	},
	{
		"id": "hxml",
		"name": "HXML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hxml_exports))
	},
	{
		"id": "hy",
		"name": "Hy",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.hy_exports))
	},
	{
		"id": "imba",
		"name": "Imba",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.imba_exports))
	},
	{
		"id": "ini",
		"name": "INI",
		"aliases": ["properties"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ini_exports))
	},
	{
		"id": "java",
		"name": "Java",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.java_exports))
	},
	{
		"id": "javascript",
		"name": "JavaScript",
		"aliases": [
			"js",
			"cjs",
			"mjs"
		],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.javascript_exports))
	},
	{
		"id": "jinja",
		"name": "Jinja",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jinja_exports))
	},
	{
		"id": "jison",
		"name": "Jison",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jison_exports))
	},
	{
		"id": "json",
		"name": "JSON",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.json_exports))
	},
	{
		"id": "json5",
		"name": "JSON5",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.json5_exports))
	},
	{
		"id": "jsonc",
		"name": "JSON with Comments",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jsonc_exports))
	},
	{
		"id": "jsonl",
		"name": "JSON Lines",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jsonl_exports))
	},
	{
		"id": "jsonnet",
		"name": "Jsonnet",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jsonnet_exports))
	},
	{
		"id": "jssm",
		"name": "JSSM",
		"aliases": ["fsl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jssm_exports))
	},
	{
		"id": "jsx",
		"name": "JSX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.jsx_exports))
	},
	{
		"id": "julia",
		"name": "Julia",
		"aliases": ["jl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.julia_exports))
	},
	{
		"id": "just",
		"name": "Just",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.just_exports))
	},
	{
		"id": "kdl",
		"name": "KDL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.kdl_exports))
	},
	{
		"id": "kotlin",
		"name": "Kotlin",
		"aliases": ["kt", "kts"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.kotlin_exports))
	},
	{
		"id": "kusto",
		"name": "Kusto",
		"aliases": ["kql"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.kusto_exports))
	},
	{
		"id": "latex",
		"name": "LaTeX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.latex_exports))
	},
	{
		"id": "lean",
		"name": "Lean 4",
		"aliases": ["lean4"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.lean_exports))
	},
	{
		"id": "less",
		"name": "Less",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.less_exports))
	},
	{
		"id": "liquid",
		"name": "Liquid",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.liquid_exports))
	},
	{
		"id": "llvm",
		"name": "LLVM IR",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.llvm_exports))
	},
	{
		"id": "log",
		"name": "Log file",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.log_exports))
	},
	{
		"id": "logo",
		"name": "Logo",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.logo_exports))
	},
	{
		"id": "lua",
		"name": "Lua",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.lua_exports))
	},
	{
		"id": "luau",
		"name": "Luau",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.luau_exports))
	},
	{
		"id": "make",
		"name": "Makefile",
		"aliases": ["makefile"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.make_exports))
	},
	{
		"id": "markdown",
		"name": "Markdown",
		"aliases": ["md"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.markdown_exports))
	},
	{
		"id": "marko",
		"name": "Marko",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.marko_exports))
	},
	{
		"id": "matlab",
		"name": "MATLAB",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.matlab_exports))
	},
	{
		"id": "mdc",
		"name": "MDC",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.mdc_exports))
	},
	{
		"id": "mdx",
		"name": "MDX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.mdx_exports))
	},
	{
		"id": "mermaid",
		"name": "Mermaid",
		"aliases": ["mmd"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.mermaid_exports))
	},
	{
		"id": "mipsasm",
		"name": "MIPS Assembly",
		"aliases": ["mips"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.mipsasm_exports))
	},
	{
		"id": "mojo",
		"name": "Mojo",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.mojo_exports))
	},
	{
		"id": "moonbit",
		"name": "MoonBit",
		"aliases": ["mbt", "mbti"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.moonbit_exports))
	},
	{
		"id": "move",
		"name": "Move",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.move_exports))
	},
	{
		"id": "narrat",
		"name": "Narrat Language",
		"aliases": ["nar"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.narrat_exports))
	},
	{
		"id": "nextflow",
		"name": "Nextflow",
		"aliases": ["nf"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nextflow_exports))
	},
	{
		"id": "nextflow-groovy",
		"name": "nextflow-groovy",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nextflow_groovy_exports))
	},
	{
		"id": "nginx",
		"name": "Nginx",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nginx_exports))
	},
	{
		"id": "nim",
		"name": "Nim",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nim_exports))
	},
	{
		"id": "nix",
		"name": "Nix",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nix_exports))
	},
	{
		"id": "nushell",
		"name": "nushell",
		"aliases": ["nu"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.nushell_exports))
	},
	{
		"id": "objective-c",
		"name": "Objective-C",
		"aliases": ["objc"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.objective_c_exports))
	},
	{
		"id": "objective-cpp",
		"name": "Objective-C++",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.objective_cpp_exports))
	},
	{
		"id": "ocaml",
		"name": "OCaml",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ocaml_exports))
	},
	{
		"id": "odin",
		"name": "Odin",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.odin_exports))
	},
	{
		"id": "openscad",
		"name": "OpenSCAD",
		"aliases": ["scad"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.openscad_exports))
	},
	{
		"id": "pascal",
		"name": "Pascal",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.pascal_exports))
	},
	{
		"id": "perl",
		"name": "Perl",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.perl_exports))
	},
	{
		"id": "php",
		"name": "PHP",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.php_exports))
	},
	{
		"id": "pkl",
		"name": "Pkl",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.pkl_exports))
	},
	{
		"id": "plsql",
		"name": "PL/SQL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.plsql_exports))
	},
	{
		"id": "po",
		"name": "Gettext PO",
		"aliases": ["pot", "potx"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.po_exports))
	},
	{
		"id": "polar",
		"name": "Polar",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.polar_exports))
	},
	{
		"id": "postcss",
		"name": "PostCSS",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.postcss_exports))
	},
	{
		"id": "powerquery",
		"name": "PowerQuery",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.powerquery_exports))
	},
	{
		"id": "powershell",
		"name": "PowerShell",
		"aliases": ["ps", "ps1"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.powershell_exports))
	},
	{
		"id": "prisma",
		"name": "Prisma",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.prisma_exports))
	},
	{
		"id": "prolog",
		"name": "Prolog",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.prolog_exports))
	},
	{
		"id": "proto",
		"name": "Protocol Buffer 3",
		"aliases": ["protobuf"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.proto_exports))
	},
	{
		"id": "pug",
		"name": "Pug",
		"aliases": ["jade"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.pug_exports))
	},
	{
		"id": "puppet",
		"name": "Puppet",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.puppet_exports))
	},
	{
		"id": "purescript",
		"name": "PureScript",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.purescript_exports))
	},
	{
		"id": "python",
		"name": "Python",
		"aliases": ["py"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.python_exports))
	},
	{
		"id": "qml",
		"name": "QML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.qml_exports))
	},
	{
		"id": "qmldir",
		"name": "QML Directory",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.qmldir_exports))
	},
	{
		"id": "qss",
		"name": "Qt Style Sheets",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.qss_exports))
	},
	{
		"id": "r",
		"name": "R",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.r_exports))
	},
	{
		"id": "racket",
		"name": "Racket",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.racket_exports))
	},
	{
		"id": "raku",
		"name": "Raku",
		"aliases": ["perl6"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.raku_exports))
	},
	{
		"id": "razor",
		"name": "ASP.NET Razor",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.razor_exports))
	},
	{
		"id": "reg",
		"name": "Windows Registry Script",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.reg_exports))
	},
	{
		"id": "regexp",
		"name": "RegExp",
		"aliases": ["regex"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.regexp_exports))
	},
	{
		"id": "rel",
		"name": "Rel",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.rel_exports))
	},
	{
		"id": "riscv",
		"name": "RISC-V",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.riscv_exports))
	},
	{
		"id": "ron",
		"name": "RON",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ron_exports))
	},
	{
		"id": "rosmsg",
		"name": "ROS Interface",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.rosmsg_exports))
	},
	{
		"id": "rst",
		"name": "reStructuredText",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.rst_exports))
	},
	{
		"id": "ruby",
		"name": "Ruby",
		"aliases": ["rb"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ruby_exports))
	},
	{
		"id": "rust",
		"name": "Rust",
		"aliases": ["rs"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.rust_exports))
	},
	{
		"id": "sas",
		"name": "SAS",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.sas_exports))
	},
	{
		"id": "sass",
		"name": "Sass",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.sass_exports))
	},
	{
		"id": "scala",
		"name": "Scala",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.scala_exports))
	},
	{
		"id": "scheme",
		"name": "Scheme",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.scheme_exports))
	},
	{
		"id": "scss",
		"name": "SCSS",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.scss_exports))
	},
	{
		"id": "sdbl",
		"name": "1C (Query)",
		"aliases": ["1c-query"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.sdbl_exports))
	},
	{
		"id": "shaderlab",
		"name": "ShaderLab",
		"aliases": ["shader"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.shaderlab_exports))
	},
	{
		"id": "shellscript",
		"name": "Shell",
		"aliases": [
			"bash",
			"sh",
			"shell",
			"zsh"
		],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.shellscript_exports))
	},
	{
		"id": "shellsession",
		"name": "Shell Session",
		"aliases": ["console"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.shellsession_exports))
	},
	{
		"id": "smalltalk",
		"name": "Smalltalk",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.smalltalk_exports))
	},
	{
		"id": "solidity",
		"name": "Solidity",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.solidity_exports))
	},
	{
		"id": "soy",
		"name": "Closure Templates",
		"aliases": ["closure-templates"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.soy_exports))
	},
	{
		"id": "sparql",
		"name": "SPARQL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.sparql_exports))
	},
	{
		"id": "splunk",
		"name": "Splunk Query Language",
		"aliases": ["spl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.splunk_exports))
	},
	{
		"id": "sql",
		"name": "SQL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.sql_exports))
	},
	{
		"id": "ssh-config",
		"name": "SSH Config",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ssh_config_exports))
	},
	{
		"id": "stata",
		"name": "Stata",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.stata_exports))
	},
	{
		"id": "stylus",
		"name": "Stylus",
		"aliases": ["styl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.stylus_exports))
	},
	{
		"id": "surrealql",
		"name": "SurrealQL",
		"aliases": ["surql"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.surrealql_exports))
	},
	{
		"id": "svelte",
		"name": "Svelte",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.svelte_exports))
	},
	{
		"id": "swift",
		"name": "Swift",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.swift_exports))
	},
	{
		"id": "system-verilog",
		"name": "SystemVerilog",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.system_verilog_exports))
	},
	{
		"id": "systemd",
		"name": "Systemd Units",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.systemd_exports))
	},
	{
		"id": "talonscript",
		"name": "TalonScript",
		"aliases": ["talon"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.talonscript_exports))
	},
	{
		"id": "tasl",
		"name": "Tasl",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.tasl_exports))
	},
	{
		"id": "tcl",
		"name": "Tcl",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.tcl_exports))
	},
	{
		"id": "templ",
		"name": "Templ",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.templ_exports))
	},
	{
		"id": "terraform",
		"name": "Terraform",
		"aliases": ["tf", "tfvars"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.terraform_exports))
	},
	{
		"id": "tex",
		"name": "TeX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.tex_exports))
	},
	{
		"id": "toml",
		"name": "TOML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.toml_exports))
	},
	{
		"id": "ts-tags",
		"name": "TypeScript with Tags",
		"aliases": ["lit"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.ts_tags_exports))
	},
	{
		"id": "tsv",
		"name": "TSV",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.tsv_exports))
	},
	{
		"id": "tsx",
		"name": "TSX",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.tsx_exports))
	},
	{
		"id": "turtle",
		"name": "Turtle",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.turtle_exports))
	},
	{
		"id": "twig",
		"name": "Twig",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.twig_exports))
	},
	{
		"id": "typescript",
		"name": "TypeScript",
		"aliases": [
			"ts",
			"cts",
			"mts"
		],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.typescript_exports))
	},
	{
		"id": "typespec",
		"name": "TypeSpec",
		"aliases": ["tsp"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.typespec_exports))
	},
	{
		"id": "typst",
		"name": "Typst",
		"aliases": ["typ"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.typst_exports))
	},
	{
		"id": "v",
		"name": "V",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.v_exports))
	},
	{
		"id": "vala",
		"name": "Vala",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vala_exports))
	},
	{
		"id": "vb",
		"name": "Visual Basic",
		"aliases": ["cmd"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vb_exports))
	},
	{
		"id": "verilog",
		"name": "Verilog",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.verilog_exports))
	},
	{
		"id": "vhdl",
		"name": "VHDL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vhdl_exports))
	},
	{
		"id": "viml",
		"name": "Vim Script",
		"aliases": ["vim", "vimscript"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.viml_exports))
	},
	{
		"id": "vue",
		"name": "Vue",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vue_exports))
	},
	{
		"id": "vue-html",
		"name": "Vue HTML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vue_html_exports))
	},
	{
		"id": "vue-vine",
		"name": "Vue Vine",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vue_vine_exports))
	},
	{
		"id": "vyper",
		"name": "Vyper",
		"aliases": ["vy"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.vyper_exports))
	},
	{
		"id": "wasm",
		"name": "WebAssembly",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wasm_exports))
	},
	{
		"id": "wenyan",
		"name": "Wenyan",
		"aliases": ["文言"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wenyan_exports))
	},
	{
		"id": "wgsl",
		"name": "WGSL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wgsl_exports))
	},
	{
		"id": "wikitext",
		"name": "Wikitext",
		"aliases": ["mediawiki", "wiki"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wikitext_exports))
	},
	{
		"id": "wit",
		"name": "WebAssembly Interface Types",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wit_exports))
	},
	{
		"id": "wolfram",
		"name": "Wolfram",
		"aliases": ["wl"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.wolfram_exports))
	},
	{
		"id": "xml",
		"name": "XML",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.xml_exports))
	},
	{
		"id": "xsl",
		"name": "XSL",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.xsl_exports))
	},
	{
		"id": "yaml",
		"name": "YAML",
		"aliases": ["yml"],
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.yaml_exports))
	},
	{
		"id": "zenscript",
		"name": "ZenScript",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.zenscript_exports))
	},
	{
		"id": "zig",
		"name": "Zig",
		"import": (() => import("./shikijs__langs.mjs").then((n) => n.zig_exports))
	}
];
var bundledLanguagesBase = Object.fromEntries(bundledLanguagesInfo.map((i) => [i.id, i.import]));
var bundledLanguagesAlias = Object.fromEntries(bundledLanguagesInfo.flatMap((i) => i.aliases?.map((a) => [a, i.import]) || []));
var bundledLanguages = {
	...bundledLanguagesBase,
	...bundledLanguagesAlias
};
//#endregion
//#region node_modules/@streamdown/code/node_modules/shiki/dist/bundle-full.mjs
var createHighlighter = /* @__PURE__ */ createBundledHighlighter({
	langs: bundledLanguages,
	themes: Object.fromEntries([
		{
			"id": "andromeeda",
			"displayName": "Andromeeda",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.andromeeda_exports))
		},
		{
			"id": "aurora-x",
			"displayName": "Aurora X",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.aurora_x_exports))
		},
		{
			"id": "ayu-dark",
			"displayName": "Ayu Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.ayu_dark_exports))
		},
		{
			"id": "ayu-light",
			"displayName": "Ayu Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.ayu_light_exports))
		},
		{
			"id": "ayu-mirage",
			"displayName": "Ayu Mirage",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.ayu_mirage_exports))
		},
		{
			"id": "catppuccin-frappe",
			"displayName": "Catppuccin Frappé",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.catppuccin_frappe_exports))
		},
		{
			"id": "catppuccin-latte",
			"displayName": "Catppuccin Latte",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.catppuccin_latte_exports))
		},
		{
			"id": "catppuccin-macchiato",
			"displayName": "Catppuccin Macchiato",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.catppuccin_macchiato_exports))
		},
		{
			"id": "catppuccin-mocha",
			"displayName": "Catppuccin Mocha",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.catppuccin_mocha_exports))
		},
		{
			"id": "dark-plus",
			"displayName": "Dark Plus",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.dark_plus_exports))
		},
		{
			"id": "dracula",
			"displayName": "Dracula Theme",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.dracula_exports))
		},
		{
			"id": "dracula-soft",
			"displayName": "Dracula Theme Soft",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.dracula_soft_exports))
		},
		{
			"id": "everforest-dark",
			"displayName": "Everforest Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.everforest_dark_exports))
		},
		{
			"id": "everforest-light",
			"displayName": "Everforest Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.everforest_light_exports))
		},
		{
			"id": "github-dark",
			"displayName": "GitHub Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_dark_exports))
		},
		{
			"id": "github-dark-default",
			"displayName": "GitHub Dark Default",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_dark_default_exports))
		},
		{
			"id": "github-dark-dimmed",
			"displayName": "GitHub Dark Dimmed",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_dark_dimmed_exports))
		},
		{
			"id": "github-dark-high-contrast",
			"displayName": "GitHub Dark High Contrast",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_dark_high_contrast_exports))
		},
		{
			"id": "github-light",
			"displayName": "GitHub Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_light_exports))
		},
		{
			"id": "github-light-default",
			"displayName": "GitHub Light Default",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_light_default_exports))
		},
		{
			"id": "github-light-high-contrast",
			"displayName": "GitHub Light High Contrast",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.github_light_high_contrast_exports))
		},
		{
			"id": "gruvbox-dark-hard",
			"displayName": "Gruvbox Dark Hard",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_dark_hard_exports))
		},
		{
			"id": "gruvbox-dark-medium",
			"displayName": "Gruvbox Dark Medium",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_dark_medium_exports))
		},
		{
			"id": "gruvbox-dark-soft",
			"displayName": "Gruvbox Dark Soft",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_dark_soft_exports))
		},
		{
			"id": "gruvbox-light-hard",
			"displayName": "Gruvbox Light Hard",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_light_hard_exports))
		},
		{
			"id": "gruvbox-light-medium",
			"displayName": "Gruvbox Light Medium",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_light_medium_exports))
		},
		{
			"id": "gruvbox-light-soft",
			"displayName": "Gruvbox Light Soft",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.gruvbox_light_soft_exports))
		},
		{
			"id": "horizon",
			"displayName": "Horizon",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.horizon_exports))
		},
		{
			"id": "horizon-bright",
			"displayName": "Horizon Bright",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.horizon_bright_exports))
		},
		{
			"id": "houston",
			"displayName": "Houston",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.houston_exports))
		},
		{
			"id": "kanagawa-dragon",
			"displayName": "Kanagawa Dragon",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.kanagawa_dragon_exports))
		},
		{
			"id": "kanagawa-lotus",
			"displayName": "Kanagawa Lotus",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.kanagawa_lotus_exports))
		},
		{
			"id": "kanagawa-wave",
			"displayName": "Kanagawa Wave",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.kanagawa_wave_exports))
		},
		{
			"id": "laserwave",
			"displayName": "LaserWave",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.laserwave_exports))
		},
		{
			"id": "light-plus",
			"displayName": "Light Plus",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.light_plus_exports))
		},
		{
			"id": "material-theme",
			"displayName": "Material Theme",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.material_theme_exports))
		},
		{
			"id": "material-theme-darker",
			"displayName": "Material Theme Darker",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.material_theme_darker_exports))
		},
		{
			"id": "material-theme-lighter",
			"displayName": "Material Theme Lighter",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.material_theme_lighter_exports))
		},
		{
			"id": "material-theme-ocean",
			"displayName": "Material Theme Ocean",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.material_theme_ocean_exports))
		},
		{
			"id": "material-theme-palenight",
			"displayName": "Material Theme Palenight",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.material_theme_palenight_exports))
		},
		{
			"id": "min-dark",
			"displayName": "Min Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.min_dark_exports))
		},
		{
			"id": "min-light",
			"displayName": "Min Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.min_light_exports))
		},
		{
			"id": "monokai",
			"displayName": "Monokai",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.monokai_exports))
		},
		{
			"id": "night-owl",
			"displayName": "Night Owl",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.night_owl_exports))
		},
		{
			"id": "night-owl-light",
			"displayName": "Night Owl Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.night_owl_light_exports))
		},
		{
			"id": "nord",
			"displayName": "Nord",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.nord_exports))
		},
		{
			"id": "one-dark-pro",
			"displayName": "One Dark Pro",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.one_dark_pro_exports))
		},
		{
			"id": "one-light",
			"displayName": "One Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.one_light_exports))
		},
		{
			"id": "plastic",
			"displayName": "Plastic",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.plastic_exports))
		},
		{
			"id": "poimandres",
			"displayName": "Poimandres",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.poimandres_exports))
		},
		{
			"id": "red",
			"displayName": "Red",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.red_exports))
		},
		{
			"id": "rose-pine",
			"displayName": "Rosé Pine",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.rose_pine_exports))
		},
		{
			"id": "rose-pine-dawn",
			"displayName": "Rosé Pine Dawn",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.rose_pine_dawn_exports))
		},
		{
			"id": "rose-pine-moon",
			"displayName": "Rosé Pine Moon",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.rose_pine_moon_exports))
		},
		{
			"id": "slack-dark",
			"displayName": "Slack Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.slack_dark_exports))
		},
		{
			"id": "slack-ochin",
			"displayName": "Slack Ochin",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.slack_ochin_exports))
		},
		{
			"id": "snazzy-light",
			"displayName": "Snazzy Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.snazzy_light_exports))
		},
		{
			"id": "solarized-dark",
			"displayName": "Solarized Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.solarized_dark_exports))
		},
		{
			"id": "solarized-light",
			"displayName": "Solarized Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.solarized_light_exports))
		},
		{
			"id": "synthwave-84",
			"displayName": "Synthwave '84",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.synthwave_84_exports))
		},
		{
			"id": "tokyo-night",
			"displayName": "Tokyo Night",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.tokyo_night_exports))
		},
		{
			"id": "vesper",
			"displayName": "Vesper",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.vesper_exports))
		},
		{
			"id": "vitesse-black",
			"displayName": "Vitesse Black",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.vitesse_black_exports))
		},
		{
			"id": "vitesse-dark",
			"displayName": "Vitesse Dark",
			"type": "dark",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.vitesse_dark_exports))
		},
		{
			"id": "vitesse-light",
			"displayName": "Vitesse Light",
			"type": "light",
			"import": (() => import("./shikijs__themes.mjs").then((n) => n.vitesse_light_exports))
		}
	].map((i) => [i.id, i.import])),
	engine: () => createOnigurumaEngine(import("./shiki.mjs").then((n) => n.onig_exports))
});
var { codeToHtml, codeToHast, codeToTokens, codeToTokensBase, codeToTokensWithThemes, getSingletonHighlighter, getLastGrammarState } = /* @__PURE__ */ createSingletonShorthands(createHighlighter, { guessEmbeddedLanguages });
//#endregion
//#region node_modules/@streamdown/code/dist/index.js
var S = createJavaScriptRegexEngine({ forgiving: true }), C = Object.fromEntries(bundledLanguagesInfo.flatMap((e) => {
	var n;
	return ((n = e.aliases) != null ? n : []).map((t) => [t, e.id]);
})), r = new Set(Object.keys(bundledLanguages)), B = (e) => {
	let t = e.trim().toLowerCase();
	return C[t] || (r.has(t), t);
}, c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), o = (e) => {
	var n;
	return typeof e == "string" ? e : (n = e.name) != null ? n : "custom";
}, v = (e, n) => `${e}-${o(n[0])}-${o(n[1])}`, x = (e, n, t) => {
	let g = e.slice(0, 100), u = e.length > 100 ? e.slice(-100) : "";
	return `${n}:${t[0]}:${t[1]}:${e.length}:${g}:${u}`;
}, P = (e, n) => {
	let t = v(e, n);
	if (c.has(t)) return c.get(t);
	let g = createHighlighter({
		themes: n,
		langs: [e],
		engine: S
	});
	return c.set(t, g), g;
};
function $(e = {}) {
	var t;
	let n = (t = e.themes) != null ? t : ["github-light", "github-dark"];
	return {
		name: "shiki",
		type: "code-highlighter",
		supportsLanguage(g) {
			let u = B(g);
			return r.has(u);
		},
		getSupportedLanguages() {
			return Array.from(r);
		},
		getThemes() {
			return n;
		},
		highlight({ code: g, language: u, themes: h }, m) {
			let i = B(u), d = [o(h[0]), o(h[1])], a = x(g, i, d);
			if (p.has(a)) return p.get(a);
			m && (s.has(a) || s.set(a, /* @__PURE__ */ new Set()), s.get(a).add(m));
			return P(r.has(i) ? i : "text", h).then((l) => {
				let y = l.getLoadedLanguages().includes(i) ? i : "text", L = l.codeToTokens(g, {
					lang: y,
					themes: {
						light: d[0],
						dark: d[1]
					}
				});
				p.set(a, L);
				let T = s.get(a);
				if (T) {
					for (let H of T) H(L);
					s.delete(a);
				}
			}).catch((l) => {
				console.error("[Streamdown Code] Failed to highlight code:", l), s.delete(a);
			}), null;
		}
	};
}
var G = $();
//#endregion
export { G };
